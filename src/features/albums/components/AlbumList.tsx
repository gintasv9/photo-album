import Button from '../../../common/components/Button';
import { useAlbumList } from '../hooks/useAlbumList';
import AlbumRow from './AlbumRow';

interface Props {
  userId: number;
}

const AlbumList: React.FC<Props> = ({ userId }) => {
  const { albums, isLoading, selectedId, actionsDisabled, addAlbum, toggleAlbum, reset, save } = useAlbumList(userId);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="flex p-4 border-b-8">
        <h1 className="font-bold self-center">Albums</h1>
        <div className="ml-auto">
          <Button disabled={actionsDisabled} variant="primary" className="mx-4" onClick={save}>
            Save all changes
          </Button>
          <Button disabled={actionsDisabled} variant="default" onClick={reset}>
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
