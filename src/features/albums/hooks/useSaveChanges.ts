import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { updateAlbum, addNewPhoto, addNewAlbum, updatePhoto } from '../api';
import { Photo } from '../model';
import { useAlbumChangesContext } from './useAlbumChangesContext';

export const useSaveChanges = () => {
  const { changes, reset } = useAlbumChangesContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: addAlbum } = useMutation(addNewAlbum);

  const { mutateAsync: mutateAlbum } = useMutation(updateAlbum);

  const { mutateAsync: addPhoto } = useMutation(addNewPhoto);

  const { mutateAsync: mutatePhoto } = useMutation(updatePhoto);

  const save = async () => {
    const albumPromises = Object.values(changes)
      .filter((x) => !!x.album)
      .map((x) => (x.album!.id > 0 ? mutateAlbum(x.album!) : addAlbum(x.album!)));

    const photoPromises = Object.values(changes)
      .filter((x) => !!x.photos)
      .reduce<Promise<Photo>[]>((arr, x) => {
        arr.push(...x.photos!.map((y) => (y.id > 0 ? mutatePhoto(y) : addPhoto(y))));
        return arr;
      }, []);

    try {
      await Promise.all(albumPromises);
      await Promise.all(photoPromises);

      enqueueSnackbar('Successfully saved albums.', { variant: 'success' });
      reset();
    } catch (error) {
      enqueueSnackbar('Failed to save album changes.', { variant: 'error' });
    }
  };

  return { save };
};
