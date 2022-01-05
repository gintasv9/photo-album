import { useParams } from 'react-router-dom';

const AlbumList: React.FC = () => {
  const { userId } = useParams();
  return <h1>Here be my albums! {userId}</h1>;
};

export default AlbumList;
