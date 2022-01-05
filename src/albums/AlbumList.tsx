import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserAlbums } from './albumList.api';

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
        <p key={album.id}>{`Album id: ${album.id}; Album title: ${album.title}`}</p>
      ))}
    </div>
  );
};

export default AlbumList;
