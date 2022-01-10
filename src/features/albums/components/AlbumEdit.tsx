import Button from '../../../common/components/Button';
import { Album } from '../model';
import AlbumEditForm from './AlbumEditForm';

interface Props {
  album: Album;
  onAddPhoto: () => void;
}

const AlbumEdit: React.FC<Props> = ({ album, onAddPhoto }) => {
  return (
    <div className="flex flex-wrap justify-center items-center m-2">
      <AlbumEditForm album={album} />

      <div>
        <span className="mx-2">or</span>

        <Button variant="secondary" onClick={onAddPhoto}>
          Add new photo
        </Button>
      </div>
    </div>
  );
};

export default AlbumEdit;
