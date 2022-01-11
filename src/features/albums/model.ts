export interface Album {
  userId: number;
  id: number;
  title: string;
}

export type AlbumDto = Omit<Album, 'id'>;

export interface AlbumEditFormModel {
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type PhotoDto = Omit<Photo, 'id'>;

export type PhotoEditForm = Omit<Photo, 'id' | 'albumId'>;

export const mapAlbumToDto = (album: Album): AlbumDto => ({
  userId: album.userId,
  title: album.title
});

export const mapPhotoToDto = (photo: Photo): PhotoDto => ({
  albumId: photo.albumId,
  title: photo.title,
  thumbnailUrl: photo.thumbnailUrl,
  url: photo.url
});
