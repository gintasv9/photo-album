import { useParams } from 'react-router-dom';
import AlbumList from './components/AlbumList';
import { AlbumChangesProvider } from './hooks/useAlbumChangesContext';

const Albums: React.FC = () => {
  const { userId } = useParams();

  const id = Number(userId);

  if (isNaN(id)) {
    return <h1 className="font-bold text-xl">Hey, stop hacking!</h1>;
  }

  return (
    <AlbumChangesProvider>
      <AlbumList userId={id} />
    </AlbumChangesProvider>
  );
};

export default Albums;
