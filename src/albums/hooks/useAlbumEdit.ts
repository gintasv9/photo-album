import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { updateAlbum, addPhoto } from '../api';
import { Album, AlbumEditForm, Photo } from '../model';

const URL_REGEX = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const validationSchema: yup.SchemaOf<AlbumEditForm> = yup.object({
  title: yup.string().required('Provide album`s name'),
  photos: yup.array().of(
    yup.object({
      title: yup.string().required('Field cannot be empty'),
      url: yup.string().required('Field cannot be empty').matches(URL_REGEX, 'Please enter a valid URL'),
      thumbnailUrl: yup.string().required('Field cannot be empty').matches(URL_REGEX, 'Please enter a valid URL')
    })
  )
});

export const useAlbumEdit = (initialAlbum: Album, onSubmitted: () => void) => {
  const { userId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const { mutateAsync: mutateAlbum } = useMutation(updateAlbum, {
    onSuccess: (updatedAlbum) => {
      queryClient.setQueryData<Album[]>(['albums', userId], (prevAlbums) =>
        (prevAlbums || []).map((album) => (updatedAlbum.id === album.id ? updatedAlbum : album))
      );
    }
  });

  const { mutateAsync: mutatePhoto } = useMutation(addPhoto, {
    onSuccess: (photo) => {
      queryClient.setQueryData<Photo[]>(['photos', initialAlbum.id], (prevPhotos) => [...(prevPhotos || []), photo]);
    }
  });

  const {
    control,
    formState: { errors },
    register,
    reset,
    handleSubmit
  } = useForm<AlbumEditForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: { title: initialAlbum.title, photos: [] }
  });

  const { fields, append } = useFieldArray({ control, name: 'photos' });

  const submit: SubmitHandler<AlbumEditForm> = async (data) => {
    try {
      await Promise.all([
        mutateAlbum({ albumId: initialAlbum.id, title: data.title }),
        ...data.photos.map((photo) => mutatePhoto({ albumId: initialAlbum.id, photo }))
      ]);

      enqueueSnackbar(`Updated "${data.title}" album.`, { variant: 'success' });
      reset({ photos: [] });
      onSubmitted();
    } catch (ex) {
      enqueueSnackbar(`Failed to save "${initialAlbum.title}" album.`, { variant: 'error' });
    }
  };

  return {
    register,
    formPhotos: fields,
    appendFormPhoto: append,
    errors,
    submit: handleSubmit(submit)
  };
};
