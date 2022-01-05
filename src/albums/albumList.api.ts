import axiosInstance from '../axios';
import { Album } from './albumList.model';

export const getUserAlbums = async (userId: number): Promise<Album[]> => {
  const { data } = await axiosInstance.get(`/users/${userId}/albums`);
  return data;
};
