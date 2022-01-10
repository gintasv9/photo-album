import Button from '../../../common/components/Button';
import FormGroup from '../../../common/components/FormGroup';
import { useAlbumEditForm } from '../hooks/useAlbumEditForm';
import { Album } from '../model';

interface Props {
  album: Album;
}

const AlbumEditForm: React.FC<Props> = ({ album }) => {
  const {
    register,
    formState: { errors, isDirty },
    submit
  } = useAlbumEditForm(album);

  return (
    <form className="flex items-center" onSubmit={submit}>
      <FormGroup
        label="Change album name"
        register={register('title', { validate: (value) => !!value.trim().length || 'Album name is required' })}
        errors={errors}
      />
      <Button type="submit" variant="primary" className="ml-2" disabled={!isDirty}>
        Save
      </Button>
    </form>
  );
};

export default AlbumEditForm;
