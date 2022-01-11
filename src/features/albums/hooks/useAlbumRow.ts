import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { randomNegativeId } from '../../../utils/ids';
import { getAlbumPhotos } from '../api';
import { Photo } from '../model';

type AlbumMode = 'view' | 'edit';

export const useAlbumRow = (albumId: number, isSelected: boolean, photoChanges: Photo[] = []) => {
  const initialMode = albumId > 0 ? 'view' : 'edit';
  const [mode, setMode] = useState<AlbumMode>(initialMode);
  const { data, isLoading } = useQuery(['photos', albumId], () => getAlbumPhotos(albumId), {
    enabled: isSelected && albumId > 0
  });

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [isSelected, initialMode, setMode]);

  const photos = photoChanges.concat(
    (data || []).filter((photo) => !photoChanges.some((changedPhoto) => changedPhoto.id === photo.id))
  );

  const changeSelectedPhoto = (photo: Photo | null) => () => setSelectedPhoto(photo);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'view' ? 'edit' : 'view'));
  };

  const addPhoto = () =>
    setSelectedPhoto({
      id: randomNegativeId(),
      albumId,
      title: '',
      url: '',
      thumbnailUrl: ''
    });

  return {
    photos,
    isLoading,
    mode,
    selectedPhoto,
    changeSelectedPhoto,
    toggleMode,
    addPhoto
  };
};
