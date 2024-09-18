export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type EnrichedAlbum = Omit<Album, "userId"> & {
  user: User;
};

export type EnrichedPhoto = Omit<Photo, "albumId"> & {
  album: EnrichedAlbum;
};

export interface PhotoQueryFilters {
  title?: string;
  "album.title"?: string;
  "album.user.email"?: string;
  limit?: number;
  offset?: number;
}
