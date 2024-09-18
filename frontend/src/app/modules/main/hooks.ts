import { useQuery } from "react-query";
import { axiosInstance } from "../common/utils/axiosConfig";

const fetchPhotos = async (queryParams: string = "") => {
  const response = await axiosInstance.get("photos" + (queryParams ? `?${queryParams}` : ""));
  return response.data;
};

const usePhotos = (filters?: Record<string, string>) => {
  const params = new URLSearchParams(filters);
  return useQuery({
    queryKey: ["photos", params.toString()],
    queryFn: () => fetchPhotos(params.toString()),
  });
};

const fetchPhoto = async (id: string) => {
  const response = await axiosInstance.get(`photos/${id}`);
  return response.data;
};

const usePhoto = (id: string) => {
  return useQuery({
    queryKey: ["photos", id],
    queryFn: () => fetchPhoto(id),
  });
};

export { usePhotos, usePhoto };
