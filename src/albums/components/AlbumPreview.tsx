import { useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import Spinner from '../../common/components/Spinner';
import { getAlbumPhotos } from '../api';
import { Album } from '../model';
import AlbumEdit from './AlbumEdit';

interface Props {
  album: Album;
}

const AlbumPreview: React.FC<Props> = ({ album }) => {
  const [editable, setEditable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading } = useQuery(['photos', album.id], () => getAlbumPhotos(album.id), { enabled: expanded });

  const handleToggleEditable = () => setEditable((prev) => !prev);

  const handleToggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <>
      <div className="flex w-full p-4 border">
        <h2 className="font-bold flex-1">{album.title}</h2>
        {!data && isLoading && <Spinner />}
        <button className="px-4" onClick={handleToggleEditable}>
          Edit
        </button>
        <button onClick={handleToggleExpanded}>{expanded ? 'Collapse' : 'Expand'}</button>
      </div>

      <div className={clsx('flex flex-wrap p-4', { hidden: !editable })}>
        <AlbumEdit album={album} onSubmitted={() => setEditable(false)} />
      </div>

      <div className={clsx('flex flex-wrap items-start p-4', { hidden: !expanded || !data })}>
        {data?.map((photo) => (
          <img
            key={photo.id}
            src={photo.thumbnailUrl}
            alt={photo.title}
            width={150}
            height={150}
            className="m-2"
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
};

export default AlbumPreview;
