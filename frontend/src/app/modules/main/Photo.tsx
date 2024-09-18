import React from "react";
import { usePhoto } from "./hooks";
import Spinner from "../common/components/Spinner";
import Card from "../common/components/Card";

interface Props {
  id: string;
}

const Photo: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = usePhoto(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Card
        key={data.id}
        title={data.title}
        imgSrc={data.thumbnailUrl}
        linkHref={`photos/${data.id}`}
      />
    </div>
  );
};

export default Photo;
