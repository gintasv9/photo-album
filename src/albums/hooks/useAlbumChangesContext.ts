import { createContext, createElement, useContext, useState } from 'react';
import { Album, Photo } from '../model';

type ChangesById<T> = Record<number, T>;

interface ChangesContext<T> {
  changes: ChangesById<T>;
  addChange: (id: number, change: T) => void;
  reset: () => void;
}

interface AlbumChanges {
  album?: Album;
  photos?: Photo[];
}

const AlbumChangesContext = createContext<ChangesContext<AlbumChanges> | null>(null);

export const AlbumChangesProvider: React.FC = ({ children }) => {
  const [changes, setChanges] = useState<ChangesById<AlbumChanges>>({});

  const addChange = (id: number, change: Partial<AlbumChanges>) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [id]: { ...prevChanges[id], ...change }
    }));
  };

  const reset = () => setChanges({});

  return createElement(AlbumChangesContext.Provider, { value: { changes, addChange, reset } }, children);
};

export const useAlbumChangesContext = () => {
  const context = useContext(AlbumChangesContext);

  if (!context) {
    throw new Error('useAlbumChangesContext must be used within AlbumChangesProvider.');
  }

  return context;
};
