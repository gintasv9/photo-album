import axiosInstance from '../axios';
import { Album, Photo } from './model';

export const getUserAlbums = async (userId: number): Promise<Album[]> => {
  const { data } = await axiosInstance.get(`/users/${userId}/albums`);
  return data;
};

export const updateAlbum = async ({ albumId, title }: { albumId: number; title: string }): Promise<Album> => {
  const { data } = await axiosInstance.patch(`/albums/${albumId}`, { title });
  return data;
};

export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  const { data } = await axiosInstance.get(`/albums/${albumId}/photos`);
  return data;
};

export const addPhoto = async ({
  albumId,
  photo
}: {
  albumId: number;
  photo: Omit<Photo, 'id' | 'albumId'>;
}): Promise<Photo> => {
  const { data } = await axiosInstance.post(`/albums/${albumId}/photos`, photo);
  return data;
};
