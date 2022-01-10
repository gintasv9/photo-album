export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type PhotoFormModel = Omit<Photo, 'id' | 'albumId'>;

export interface AlbumEditForm {
  title: string;
  photos: PhotoFormModel[];
}
