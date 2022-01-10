import Modal from '../../../common/components/Modal';
import { Photo } from '../model';

interface Props {
  photo: Photo;
  onClose: () => void;
}

const PhotoPreviewModal: React.FC<Props> = ({ photo, onClose }) => {
  return (
    <Modal header={photo.title} footer={null} onClose={onClose}>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
};

export default PhotoPreviewModal;
