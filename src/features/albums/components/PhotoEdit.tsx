import { usePhotoEdit } from '../hooks/usePhotoEdit';
import { Photo } from '../model';

interface Props {
  photo: Photo;
  onClose: () => void;
}

const PhotoEdit: React.FC<Props> = ({ photo, onClose }) => {
  const { register, errors, submit } = usePhotoEdit(photo, onClose);

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full bg-slate-400 bg-opacity-50">
      <div className="relative px-4 w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              {photo.id > 0 ? 'Edit photo' : 'Add new photo'}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <form onSubmit={submit}>
            <div className="p-6 space-y-6">
              <div className="flex flex-col p-2 m-2 border">
                <fieldset>
                  <div className="flex items-center">
                    <label className="mr-auto">Title</label>
                    <input {...register('title')} className="my-2 border" />
                  </div>
                  {errors.title && <div className="text-red-600">{errors.title?.message}</div>}
                </fieldset>
                <fieldset>
                  <label className="mr-auto">URL</label>
                  <input {...register('url')} className="my-2 border" />
                  {errors.url && <div className="text-red-600">{errors.url.message}</div>}
                </fieldset>
                <fieldset>
                  <label className="mr-auto">Thumbnail URL</label>
                  <input {...register('thumbnailUrl')} className="my-2 border" />
                  {errors.thumbnailUrl && <div className="text-red-600">{errors.thumbnailUrl.message}</div>}
                </fieldset>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {photo.id > 0 ? 'Update photo' : 'Add'}
              </button>
              <button
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoEdit;
