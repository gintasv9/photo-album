import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserAlbums } from './api';
import AlbumPreview from './components/AlbumPreview';

const AlbumList: React.FC = () => {
  const { userId } = useParams();
  const { data, isLoading } = useQuery(['albums', userId], () => getUserAlbums(Number(userId)), {
    enabled: !!userId
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data?.map((album) => (
        <AlbumPreview key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;
