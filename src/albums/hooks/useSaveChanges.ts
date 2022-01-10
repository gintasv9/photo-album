import { useQueryClient, useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { updateAlbum, addNewPhoto, addNewAlbum, updatePhoto } from '../api';
import { Album, Photo } from '../model';
import { useAlbumChangesContext } from './useAlbumChangesContext';

export const useSaveChanges = (userId: number) => {
  const queryClient = useQueryClient();
  const { changes, reset } = useAlbumChangesContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: addAlbum } = useMutation(addNewAlbum, {
    onSuccess: (createdAlbum) => {
      queryClient.setQueryData<Album[]>(['albums', userId], (prevAlbums) => [createdAlbum, ...(prevAlbums || [])]);
    }
  });

  const { mutateAsync: mutateAlbum } = useMutation(updateAlbum, {
    onSuccess: (updatedAlbum) => {
      queryClient.setQueryData<Album[]>(['albums', userId], (prevAlbums) =>
        (prevAlbums || []).map((album) => (updatedAlbum.id === album.id ? updatedAlbum : album))
      );
    }
  });

  const { mutateAsync: addPhoto } = useMutation(addNewPhoto, {
    onSuccess: (createdPhoto) => {
      queryClient.setQueryData<Photo[]>(['photos', createdPhoto.albumId], (prevPhotos) => [
        createdPhoto,
        ...(prevPhotos || [])
      ]);
    }
  });

  const { mutateAsync: mutatePhoto } = useMutation(updatePhoto, {
    onSuccess: (updatedPhoto) => {
      queryClient.setQueryData<Photo[]>(['photos', updatedPhoto.albumId], (prevPhotos) =>
        (prevPhotos || []).map((photo) => (photo.id === updatedPhoto.id ? updatedPhoto : photo))
      );
    }
  });

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
