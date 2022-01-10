import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import Badge from '../../../common/components/Badge';
import Button from '../../../common/components/Button';
import Spinner from '../../../common/components/Spinner';
import ChevronDown from '../../../common/components/icons/ChevronDown';
import { randomNegativeId } from '../../../utils/ids';
import { getAlbumPhotos } from '../api';
import { useAlbumChangesContext } from '../hooks/useAlbumChangesContext';
import { Album, Photo } from '../model';
import AlbumEdit from './AlbumEdit';
import PhotoEditModal from './PhotoEditModal';
import PhotoPreviewModal from './PhotoPreviewModal';
import PhotoThumbnail from './PhotoThumbnail';

type AlbumMode = 'view' | 'edit';

interface Props {
  album: Album;
  selected: boolean;
  onChangeSelected: (id: number | null) => void;
}

const AlbumPreview: React.FC<Props> = ({ album, selected, onChangeSelected }) => {
  const initialMode = album.id > 0 ? 'view' : 'edit';
  const [mode, setMode] = useState<AlbumMode>(initialMode);
  const { data, isLoading } = useQuery(['photos', album.id], () => getAlbumPhotos(album.id), {
    enabled: selected && album.id > 0
  });

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { changes } = useAlbumChangesContext();

  useEffect(() => {
    setMode(initialMode);
  }, [selected, initialMode, setMode]);

  const handleToggleMode = () => {
    setMode((prevMode) => (prevMode === 'view' ? 'edit' : 'view'));
  };

  const handleAddPhoto = () =>
    setSelectedPhoto({
      id: randomNegativeId(),
      albumId: album.id,
      title: '',
      url: '',
      thumbnailUrl: ''
    });

  const photos = () => {
    const photoChanges = changes[album.id]?.photos || [];
    return photoChanges.concat(
      (data || []).filter((photo) => !photoChanges.some((changedPhoto) => changedPhoto.id === photo.id))
    );
  };

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
          {selected && (
            <Button variant="default" className="mx-4 py-0" onClick={handleToggleMode}>
              {mode === 'view' ? 'Edit' : 'View'}
            </Button>
          )}

          <Button variant="iconButton" onClick={() => onChangeSelected(selected ? null : album.id)}>
            <div className={clsx({ 'rotate-180': selected })}>
              <ChevronDown />
            </div>
          </Button>
        </div>
      </div>

      <div className={clsx('p-4', { hidden: !selected })}>
        {mode === 'edit' && <AlbumEdit album={album} onAddPhoto={handleAddPhoto} />}

        <div className="flex flex-wrap justify-center items-start">
          {photos().map((photo) => (
            <div key={photo.id} onClick={() => setSelectedPhoto(photo)}>
              <PhotoThumbnail
                title={photo.title}
                thumbnailUrl={photo.thumbnailUrl}
                showBadge={!!changes[album.id]?.photos?.some((x) => x.id === photo.id)}
              />
            </div>
          ))}
        </div>

        {selectedPhoto && mode === 'view' && (
          <PhotoPreviewModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}

        {selectedPhoto && mode === 'edit' && (
          <PhotoEditModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </div>
    </>
  );
};

export default AlbumPreview;
