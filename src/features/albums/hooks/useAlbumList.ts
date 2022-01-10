import { useState } from 'react';
import { useQuery } from 'react-query';
import { randomNegativeId } from '../../../utils/ids';
import { getUserAlbums } from '../api';
import { Album } from '../model';
import { useAlbumChangesContext } from './useAlbumChangesContext';
import { useSaveChanges } from './useSaveChanges';

export const useAlbumList = (userId: number) => {
  const { data, isLoading } = useQuery(['albums', userId], () => getUserAlbums(userId));

  const { changes, addChange, reset } = useAlbumChangesContext();
  const { save } = useSaveChanges();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addAlbum = () => {
    const id = randomNegativeId();
    addChange(id, { album: { userId, id, title: `New album` } });
    setSelectedId(id);
  };

  const toggleAlbum = (id: number) => () => setSelectedId((prev) => (prev === id ? null : id));

  const albums = Object.values(changes).reduce<Album[]>(
    (arr, albumChange) => {
      if (!albumChange.album) {
        return arr;
      }

      const exists = arr.some((album) => album.id === albumChange.album?.id);
      if (!exists) {
        arr.unshift(albumChange.album);
        return arr;
      }

      return arr.map((album) => (album.id === albumChange.album?.id ? albumChange.album : album));
    },
    [...(data || [])]
  );

  return {
    albums,
    isLoading,
    selectedId,
    actionsDisabled: !Object.keys(changes).length,
    addAlbum,
    toggleAlbum,
    reset,
    save
  };
};
