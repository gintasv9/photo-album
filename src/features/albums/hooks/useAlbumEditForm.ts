import { useForm, SubmitHandler } from 'react-hook-form';
import { Album, AlbumEditForm } from '../model';
import { useAlbumChangesContext } from './useAlbumChangesContext';

export const useAlbumEditForm = (initialAlbum: Album) => {
  const { formState, register, handleSubmit, reset } = useForm<Album>({
    defaultValues: initialAlbum
  });

  const { addChange } = useAlbumChangesContext();

  const submit: SubmitHandler<AlbumEditForm> = (data) => {
    addChange(initialAlbum.id, { album: { ...initialAlbum, title: data.title } });
    reset(data);
  };

  return {
    register,
    formState,
    submit: handleSubmit(submit)
  };
};
