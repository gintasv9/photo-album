import { useAlbumEdit } from '../hooks/useAlbumEdit';
import { Album } from '../model';

interface Props {
  album: Album;
  onSubmitted: () => void;
}

const AlbumEdit: React.FC<Props> = ({ album, onSubmitted }) => {
  const { register, errors, formPhotos, appendFormPhoto, submit } = useAlbumEdit(album, onSubmitted);

  return (
    <form onSubmit={submit}>
      <fieldset>
        <input {...register('title')} className="my-2 border" />
        {errors.title && <div className="text-red-600">{errors.title.message}</div>}
      </fieldset>
      <button type="button" onClick={() => appendFormPhoto({})}>
        Add photo
      </button>
      <button type="submit">Save</button>
      <div className="flex flex-wrap -mx-2">
        {formPhotos.map((field, index) => (
          <div key={field.id} className="flex flex-col p-2 m-2 border">
            <fieldset>
              <div className="flex items-center">
                <label className="mr-auto">Title</label>
                <input {...register(`photos.${index}.title`)} className="my-2 border" />
              </div>
              {errors.photos?.[index]?.title && (
                <div className="text-red-600">{errors.photos[index].title?.message}</div>
              )}
            </fieldset>
            <fieldset>
              <label className="mr-auto">URL</label>
              <input {...register(`photos.${index}.url`)} className="my-2 border" />
              {errors.photos?.[index]?.url && <div className="text-red-600">{errors.photos[index].url?.message}</div>}
            </fieldset>
            <fieldset>
              <label className="mr-auto">Thumbnail URL</label>
              <input {...register(`photos.${index}.thumbnailUrl`)} className="my-2 border" />
              {errors.photos?.[index]?.thumbnailUrl && (
                <div className="text-red-600">{errors.photos[index].thumbnailUrl?.message}</div>
              )}
            </fieldset>
          </div>
        ))}
      </div>
    </form>
  );
};

export default AlbumEdit;
