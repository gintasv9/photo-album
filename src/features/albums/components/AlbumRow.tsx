import clsx from 'clsx';
import Badge from '../../../common/components/Badge';
import Button from '../../../common/components/Button';
import Spinner from '../../../common/components/Spinner';
import ChevronDown from '../../../common/components/icons/ChevronDown';
import { useAlbumChangesContext } from '../hooks/useAlbumChangesContext';
import { useAlbumRow } from '../hooks/useAlbumRow';
import { Album } from '../model';
import AlbumEdit from './AlbumEdit';
import PhotoEditModal from './PhotoEditModal';
import PhotoPreviewModal from './PhotoPreviewModal';
import PhotoThumbnail from './PhotoThumbnail';

interface Props {
  album: Album;
  isSelected: boolean;
  onToggle: () => void;
}

const AlbumRow: React.FC<Props> = ({ album, isSelected, onToggle }) => {
  const { changes } = useAlbumChangesContext();
  const { photos, isLoading, mode, selectedPhoto, changeSelectedPhoto, toggleMode, addPhoto } = useAlbumRow(
    album.id,
    isSelected,
    changes[album.id]?.photos
  );

  return (
    <>
      <div className="flex w-full p-4 my-1 border">
        <h2 className="font-bold flex-1 self-center">
          <Badge show={!!changes[album.id]}>{album.title}</Badge>
        </h2>

        {isLoading && (
          <div className="flex items-center">
            <Spinner />
          </div>
        )}

        <div className="flex self-center">
          {isSelected && (
            <Button variant="default" className="mx-4 py-0" onClick={toggleMode}>
              {mode === 'view' ? 'Edit' : 'View'}
            </Button>
          )}

          <Button variant="iconButton" onClick={onToggle}>
            <div className={clsx({ 'rotate-180': isSelected })}>
              <ChevronDown />
            </div>
          </Button>
        </div>
      </div>

      <div className={clsx('p-4', { hidden: !isSelected })}>
        {mode === 'edit' && <AlbumEdit album={album} onAddPhoto={addPhoto} />}

        <div className="flex flex-wrap justify-center items-start">
          {photos.map((photo) => (
            <div key={photo.id} onClick={changeSelectedPhoto(photo)}>
              <PhotoThumbnail
                title={photo.title}
                thumbnailUrl={photo.thumbnailUrl}
                showBadge={!!changes[album.id]?.photos?.some((x) => x.id === photo.id)}
              />
            </div>
          ))}
        </div>

        {selectedPhoto && mode === 'view' && (
          <PhotoPreviewModal photo={selectedPhoto} onClose={changeSelectedPhoto(null)} />
        )}

        {selectedPhoto && mode === 'edit' && (
          <PhotoEditModal photo={selectedPhoto} onClose={changeSelectedPhoto(null)} />
        )}
      </div>
    </>
  );
};

export default AlbumRow;
