import { useState } from 'react';
import { useQuery } from 'react-query';
import { randomNegativeId } from '../../../utils/ids';
import { getUserAlbums } from '../api';
import { useAlbumChangesContext } from '../hooks/useAlbumChangesContext';
import { useSaveChanges } from '../hooks/useSaveChanges';
import { Album } from '../model';
import AlbumPreview from './AlbumPreview';

export type AlbumMode = 'view' | 'edit';

interface Props {
  userId: number;
}

const AlbumList: React.FC<Props> = ({ userId }) => {
  const { data, isLoading } = useQuery(['albums', userId], () => getUserAlbums(userId));

  const { changes, addChange, reset } = useAlbumChangesContext();
  const { save } = useSaveChanges(userId);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleAddAlbum = () => {
    if (!userId) {
      return;
    }

    const id = randomNegativeId();
    addChange(id, { album: { userId, id, title: `New album` } });
    setSelectedId(id);
  };

  if (isLoading || !data) {
    return <h1>Loading...</h1>;
  }

  const albums = Object.values(changes).reduce<Album[]>(
    (arr, albumChange) => {
      if (!albumChange.album) {
        return arr;
      }

      const exists = arr.some((album) => album.id === albumChange.album?.id);
      if (!exists) {
        arr.unshift(albumChange.album);
        return arr;
      }

      return arr.map((album) => (album.id === albumChange.album?.id ? albumChange.album : album));
    },
    [...data]
  );

  return (
    <div>
      <div className="flex p-4 border-b-8">
        <h1 className="font-bold">Albums</h1>
        <div className="ml-auto">
          <button className="mx-4" onClick={save}>
            Save
          </button>
          <button onClick={reset}>Cancel</button>
        </div>
      </div>

      <button className="m-4 p-2 border" onClick={handleAddAlbum}>
        Add album
      </button>

      {albums.map((album) => (
        <AlbumPreview
          key={album.id}
          album={album}
          selected={selectedId === album.id}
          onChangeSelected={(id) => setSelectedId(id)}
        />
      ))}
    </div>
  );
};

export default AlbumList;
