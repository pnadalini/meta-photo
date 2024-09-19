import { CardContent, CardImage, LinkCard } from "@/app/modules/common/components/Card";
import React from "react";
import { EnrichedPhoto } from "../interfaces";

interface Props {
  photos: EnrichedPhoto[];
}

const PhotosPreview: React.FC<Props> = ({ photos }) => {
  return (
    <>
      {photos.map((photo: any) => (
        <LinkCard key={photo.id} href={`photos/${photo.id}`}>
          <CardImage alt={photo.title} src={photo.thumbnailUrl} />
          <CardContent>
            <p>
              <b>Title:</b> {photo.title}
            </p>
            <p>
              <b>Album Title:</b> {photo.album.title}
            </p>
            <p>
              <b>User email:</b> {photo.album.user.email}
            </p>
          </CardContent>
        </LinkCard>
      ))}
    </>
  );
};

export default PhotosPreview;
