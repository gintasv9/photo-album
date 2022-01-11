import { useState } from 'react';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { updateAlbum, addNewPhoto, addNewAlbum, updatePhoto } from '../api';
import { mapAlbumToDto, mapPhotoToDto } from '../model';
import { useAlbumChangesContext } from './useAlbumChangesContext';

export const useSaveChanges = () => {
  const [saving, setSaving] = useState(false);
  const { changes, reset } = useAlbumChangesContext();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: addAlbum } = useMutation(addNewAlbum);
  const { mutateAsync: mutateAlbum } = useMutation(updateAlbum);
  const { mutateAsync: addPhoto } = useMutation(addNewPhoto);
  const { mutateAsync: mutatePhoto } = useMutation(updatePhoto);

  const save = async () => {
    setSaving(true);

    try {
      await Object.keys(changes).reduce(async (promise, key) => {
        await promise;

        const change = changes[Number(key)];
        if (change.album) {
          const request = change.album.id > 0 ? mutateAlbum(change.album) : addAlbum(mapAlbumToDto(change.album));
          await request;
        }

        if (change.photos) {
          const requests = change.photos.map((photo) =>
            photo.id > 0 ? mutatePhoto(photo) : addPhoto(mapPhotoToDto(photo))
          );
          await Promise.all(requests);
        }
      }, Promise.resolve());

      enqueueSnackbar('Successfully saved albums.', { variant: 'success' });
      setSaving(false);
      reset();
    } catch (error) {
      enqueueSnackbar('Failed to save album changes.', { variant: 'error' });
      setSaving(false);
    }
  };

  return { saving, save };
};
