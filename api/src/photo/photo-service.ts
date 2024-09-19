import { axiosInstance } from "../utils/axios-config";
import { Album, EnrichedAlbum, EnrichedPhoto, Photo, User } from "./interfaces";

const getPhoto = async (photoId: number) => {
  const photoResponse = await axiosInstance.get<Photo>(`photos/${photoId}`);
  const photo = photoResponse.data;

  const albumResponse = await axiosInstance.get<Album>(`albums/${photo.albumId}`);
  const album = albumResponse.data;

  const userResponse = await axiosInstance.get<User>(`users/${album.userId}`);
  const user = userResponse.data;

  delete (photo as Partial<Photo>).albumId;
  delete (album as Partial<Album>).userId;

  return {
    ...photo,
    album: {
      ...album,
      user,
    },
  };
};

interface Filters {
  title?: string;
  albumTitle?: string;
  email?: string;
  limit?: number | string;
  offset?: number | string;
}

const getFilteredPhotos = async ({ title, albumTitle, email, limit = 25, offset = 0 }: Filters) => {
  let albumsEndpoint = "albums";

  let users: User[];

  if (email) {
    const usersResponse = await axiosInstance.get<User[]>(`users?email=${email}`);
    users = usersResponse.data;

    albumsEndpoint = `users/${users[0].id}/albums`;
  } else {
    const usersResponse = await axiosInstance.get<User[]>("users");
    users = usersResponse.data;
  }
  const [photosResponse, albumsResponse] = await Promise.all([
    axiosInstance.get<Photo[]>("photos"),
    axiosInstance.get<Album[]>(albumsEndpoint),
  ]);

  const mappedUsers: Record<number, User> = Object.assign(
    {},
    ...users.map((user) => ({ [user.id]: user })),
  );
  const mappedAlbums = albumsResponse.data.reduce(
    (enrichedAlbums: Record<number, EnrichedAlbum>, album) => {
      const userId = album.userId!;
      delete (album as Partial<Album>).userId;

      if (albumTitle && !album.title.includes(albumTitle)) {
        return enrichedAlbums;
      }

      enrichedAlbums[album.id] = { ...album, user: mappedUsers[userId] };

      return enrichedAlbums;
    },
    {},
  );
  const enrichedPhotos = photosResponse.data.reduce(
    (enrichedPhotos: EnrichedPhoto[], photo: Photo) => {
      const albumId = photo.albumId;

      if (title && !photo.title.includes(title)) {
        return enrichedPhotos;
      }

      if (mappedAlbums[albumId]) {
        delete (photo as Partial<Photo>).albumId;
        enrichedPhotos.push({ ...photo, album: mappedAlbums[albumId] });
      }

      return enrichedPhotos;
    },
    [],
  );

  const response = {
    page: Number(offset) + 1,
    pageCount: Math.ceil(enrichedPhotos.length / Number(limit)),
    photos: enrichedPhotos.splice(Number(offset) * Number(limit), Number(limit)),
  };

  return response;
};

export { getPhoto, getFilteredPhotos };
