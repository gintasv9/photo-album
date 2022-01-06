import { useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import Spinner from '../../common/components/Spinner';
import { getAlbumPhotos } from '../albumList.api';
import { Album } from '../albumList.model';

const AlbumPreview: React.FC<Album> = ({ id, title }) => {
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading } = useQuery(['photos', id], () => getAlbumPhotos(id), { enabled: expanded });

  const handleToggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <>
      <div className="flex w-full p-4 border" onClick={handleToggleExpanded}>
        <h2 className="font-bold flex-1">{title}</h2>
        {!data && isLoading && <Spinner />}
        <button className="px-4">Edit</button>
        <button>Expand/Collapse</button>
      </div>

      <div className={clsx('flex flex-wrap p-4', { hidden: !expanded || !data })}>
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
