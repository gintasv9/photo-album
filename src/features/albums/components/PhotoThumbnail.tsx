import { memo } from 'react';
import Badge from '../../../common/components/Badge';

interface Props {
  title: string;
  thumbnailUrl: string;
  showBadge: boolean;
}

const PhotoThumbnail: React.FC<Props> = ({ title, thumbnailUrl, showBadge }) => {
  return (
    <div className="m-2">
      <Badge show={showBadge}>
        <img src={thumbnailUrl} alt={title} width={150} height={150} className="cursor-pointer" loading="lazy" />
      </Badge>
    </div>
  );
};

export default memo(PhotoThumbnail);
