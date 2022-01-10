import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Photo } from '../model';
import { useAlbumChangesContext } from './useAlbumChangesContext';

const URL_REGEX = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

type PhotoEditForm = Omit<Photo, 'id' | 'albumId'>;

const validationSchema: yup.SchemaOf<PhotoEditForm> = yup.object({
  title: yup.string().required('Field cannot be empty'),
  url: yup.string().required('Field cannot be empty').matches(URL_REGEX, 'Please enter a valid URL'),
  thumbnailUrl: yup.string().required('Field cannot be empty').matches(URL_REGEX, 'Please enter a valid URL')
});

export const usePhotoEdit = (initialPhoto: Photo, onSubmitted: () => void) => {
  const { formState, register, handleSubmit } = useForm<PhotoEditForm>({
    defaultValues: initialPhoto,
    resolver: yupResolver(validationSchema)
  });

  const { changes, addChange } = useAlbumChangesContext();

  const submit: SubmitHandler<PhotoEditForm> = (data) => {
    const updatedPhoto: Photo = { ...initialPhoto, ...data };
    const previousPhotoChanges = changes[initialPhoto.albumId]?.photos || [];
    const exists = previousPhotoChanges.some((changedPhoto) => changedPhoto.id === initialPhoto.id);
    const photos = exists
      ? previousPhotoChanges.map((x) => (x.id === initialPhoto.id ? updatedPhoto : x))
      : [updatedPhoto, ...previousPhotoChanges];

    addChange(initialPhoto.albumId, { photos });
    onSubmitted();
  };

  return {
    register,
    formState,
    submit: handleSubmit(submit)
  };
};
