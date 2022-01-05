import axiosInstance from '../axios';
import { Album, Photo } from './albumList.model';

export const getUserAlbums = async (userId: number): Promise<Album[]> => {
  const { data } = await axiosInstance.get(`/users/${userId}/albums`);
  return data;
};

export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  const { data } = await axiosInstance.get(`/albums/${albumId}/photos`);
  return data;
};
