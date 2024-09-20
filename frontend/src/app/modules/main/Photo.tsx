import React from "react";
import { usePhoto } from "./hooks";
import Spinner from "../common/components/Spinner";
import { Card, CardContent, CardImage } from "../common/components/Card";

interface Props {
  id: string;
}

const Photo: React.FC<Props> = ({ id }) => {
  const { data, isLoading, error } = usePhoto(id);

  if (isLoading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <div className="m-5">Error when trying to load the photo {error?.message}</div>;
  }

  const photo = data;

  return (
    <div className="m-5 flex justify-center">
      <Card>
        <CardImage alt={photo.title} src={photo.url} />
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
          <p>
            <b>User Company:</b> {photo.album.user.company.name}
          </p>
          <p>
            <b>User Name:</b> {photo.album.user.name}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Photo;
