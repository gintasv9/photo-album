import { useAlbumEdit } from '../hooks/useAlbumEdit';
import { Album } from '../model';

interface Props {
  album: Album;
}

const AlbumEdit: React.FC<Props> = ({ album }) => {
  const { register, errors, submit } = useAlbumEdit(album);

  return (
    <form className="flex items-center" onSubmit={submit}>
      <div>
        <input
          {...register('title', { validate: (value) => !!value.trim().length || 'Album name is required' })}
          className="border"
        />
        {errors.title && <div className="mt-1 text-red-600 text-xs">{errors.title.message}</div>}
      </div>
      <button type="submit" className="border mx-2 p-2">
        Save
      </button>
    </form>
  );
};

export default AlbumEdit;
