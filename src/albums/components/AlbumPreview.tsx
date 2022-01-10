import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import Spinner from '../../common/components/Spinner';
import { randomNegativeId } from '../../utils/ids';
import { AlbumMode } from '../AlbumList';
import { getAlbumPhotos } from '../api';
import { useAlbumChangesContext } from '../hooks/useAlbumChangesContext';
import { Album, Photo } from '../model';
import AlbumEdit from './AlbumEdit';
import PhotoEdit from './PhotoEdit';

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

  const [photoForEditing, setPhotoForEditing] = useState<Photo | null>(null);

  const { changes } = useAlbumChangesContext();

  useEffect(() => {
    setMode(initialMode);
  }, [selected, initialMode, setMode]);

  const handleToggleMode = () => {
    setMode((prevMode) => (prevMode === 'view' ? 'edit' : 'view'));
  };

  const photos = () => {
    const photoChanges = changes[album.id]?.photos || [];
    return photoChanges.concat(
      (data || []).filter((photo) => !photoChanges.some((changedPhoto) => changedPhoto.id === photo.id))
    );
  };

  return (
    <>
      <div className="flex w-full p-4 border">
        <h2 className={clsx('font-bold flex-1', { italic: album.id < 0 })}>{album.title}</h2>
        {isLoading && <Spinner />}
        {selected && (
          <button className="px-4" onClick={handleToggleMode}>
            {mode === 'view' ? 'Edit' : 'View'}
          </button>
        )}
        <button onClick={() => onChangeSelected(selected ? null : album.id)}>{selected ? 'Collapse' : 'Expand'}</button>
      </div>

      <div className={clsx('p-4', { hidden: !selected })}>
        {mode === 'edit' && (
          <div className="flex justify-between">
            <AlbumEdit album={album} />
            <button
              className="border m-2 p-2"
              onClick={() =>
                setPhotoForEditing({
                  id: randomNegativeId(),
                  albumId: album.id,
                  title: '',
                  url: '',
                  thumbnailUrl: ''
                })
              }
            >
              Add new photo
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-start">
          {photos().map((photo) => (
            <img
              key={photo.id}
              src={photo.thumbnailUrl}
              alt={photo.title}
              width={150}
              height={150}
              className={clsx('m-2', { 'cursor-pointer': mode === 'edit' })}
              loading="lazy"
              onClick={mode === 'edit' ? () => setPhotoForEditing(photo) : undefined}
            />
          ))}
        </div>

        {photoForEditing && <PhotoEdit photo={photoForEditing} onClose={() => setPhotoForEditing(null)} />}
      </div>
    </>
  );
};

export default AlbumPreview;
