import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../common/utils/axiosConfig";
import { Photo } from "./Photos/interfaces";

interface PhotosResponse {
  photos: Photo[];
  page: number;
  pageCount: number;
}

const fetchPhotos = async (queryParams: string = "") => {
  const response = await axiosInstance.get<PhotosResponse>(
    "photos" + (queryParams ? `?${queryParams}` : ""),
  );
  return response.data;
};

const usePhotos = (filters: Record<string, string> = {}) => {
  const photoFilters = Object.fromEntries(
    Object.entries({
      title: filters?.title || null,
      "album.title": filters?.albumTitle || null,
      "album.user.email": filters?.userEmail || null,
      offset: filters?.offset || null,
      limit: filters?.limit || null,
    }).filter(([_, value]) => value !== null),
  ) as Record<string, string>;

  const params = new URLSearchParams(photoFilters);
  return useQuery({
    queryKey: ["photos", params.toString()],
    queryFn: () => fetchPhotos(params.toString()),
    placeholderData: keepPreviousData,
  });
};

const fetchPhoto = async (id: string) => {
  const response = await axiosInstance.get<Photo>(`photos/${id}`);
  return response.data;
};

const usePhoto = (id: string) => {
  return useQuery({
    queryKey: ["photos", id],
    queryFn: () => fetchPhoto(id),
  });
};

export { usePhotos, usePhoto };
