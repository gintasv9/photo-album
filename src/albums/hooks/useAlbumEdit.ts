import { useForm, SubmitHandler } from 'react-hook-form';
import { Album, AlbumEditForm } from '../model';
import { useAlbumChangesContext } from './useAlbumChangesContext';

export const useAlbumEdit = (initialAlbum: Album) => {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<Album>({
    defaultValues: initialAlbum
  });

  const { addChange } = useAlbumChangesContext();

  const submit: SubmitHandler<AlbumEditForm> = (data) => {
    addChange(initialAlbum.id, { album: { ...initialAlbum, title: data.title } });
  };

  return {
    register,
    errors,
    submit: handleSubmit(submit)
  };
};
