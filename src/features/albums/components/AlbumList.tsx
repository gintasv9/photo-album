import Button from '../../../common/components/Button';
import Spinner from '../../../common/components/Spinner';
import { useAlbumList } from '../hooks/useAlbumList';
import { useSaveChanges } from '../hooks/useSaveChanges';
import AlbumRow from './AlbumRow';

interface Props {
  userId: number;
}

const AlbumList: React.FC<Props> = ({ userId }) => {
  const { albums, isLoading, selectedId, actionsDisabled, addAlbum, toggleAlbum, reset } = useAlbumList(userId);
  const { saving, save } = useSaveChanges();

  return (
    <div>
      <div className="flex items-center p-4 border-b-8">
        <h1 className="font-bold mr-2">Albums</h1>

        {(saving || isLoading) && <Spinner />}

        <div className="ml-auto">
          <Button disabled={actionsDisabled || saving} variant="primary" className="mx-4" onClick={save}>
            Save all changes
          </Button>
          <Button disabled={actionsDisabled || saving} variant="default" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      <Button variant="secondary" className="m-4" onClick={addAlbum}>
        Add album
      </Button>

      {albums.map((album) => (
        <AlbumRow key={album.id} album={album} isSelected={selectedId === album.id} onToggle={toggleAlbum(album.id)} />
      ))}
    </div>
  );
};

export default AlbumList;
