import axiosInstance from '../../config/axios';
import { Album, Photo } from './model';

export const getUserAlbums = async (userId: number): Promise<Album[]> => {
  const { data } = await axiosInstance.get(`/users/${userId}/albums`);
  return data;
};

export const addNewAlbum = async (album: Omit<Album, 'id'>): Promise<Album> => {
  const { data } = await axiosInstance.post(`/albums`, album);
  return data;
};

export const updateAlbum = async (album: Album): Promise<Album> => {
  const { data } = await axiosInstance.patch(`/albums/${album.id}`, album);
  return data;
};

export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  const { data } = await axiosInstance.get(`/albums/${albumId}/photos`);
  return data;
};

export const addNewPhoto = async (photo: Omit<Photo, 'id'>): Promise<Photo> => {
  const { data } = await axiosInstance.post(`/photos`, photo);
  return data;
};

export const updatePhoto = async (photo: Photo): Promise<Photo> => {
  const { data } = await axiosInstance.patch(`/photos/${photo.id}`, photo);
  return data;
};
