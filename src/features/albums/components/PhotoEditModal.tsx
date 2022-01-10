import Button from '../../../common/components/Button';
import FormGroup from '../../../common/components/FormGroup';
import Modal from '../../../common/components/Modal';
import { usePhotoEdit } from '../hooks/usePhotoEdit';
import { Photo } from '../model';

interface Props {
  photo: Photo;
  onClose: () => void;
}

const PhotoEditModal: React.FC<Props> = ({ photo, onClose }) => {
  const {
    register,
    formState: { errors, isDirty },
    submit
  } = usePhotoEdit(photo, onClose);

  return (
    <Modal header={photo.id > 0 ? 'Edit photo' : 'Add new photo'} footer={null} onClose={onClose}>
      <form onSubmit={submit}>
        <FormGroup label="Title" errors={errors} register={register('title')} />
        <FormGroup label="URL" errors={errors} register={register('url')} />
        <FormGroup label="Thumbnail URL" errors={errors} register={register('thumbnailUrl')} />

        <div className="flex items-center pt-6 px-6 -mx-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <Button type="submit" variant="primary" disabled={!isDirty} onClick={submit}>
            {photo.id > 0 ? 'Update photo' : 'Add'}
          </Button>
          <Button type="button" variant="default" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PhotoEditModal;
