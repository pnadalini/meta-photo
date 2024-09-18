"use client";
import React from "react";
import { usePhotos } from "../hooks";
import Spinner from "../../common/components/Spinner";
import Pagination from "../../common/components/Pagination";
import Card from "../../common/components/Card";

interface Props {}

const Photos: React.FC<Props> = ({}) => {
  const { data, isLoading } = usePhotos();
  console.info(data, isLoading);

  const onPrevClick = () => {};
  const onNextClick = () => {};

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-5">
      <div className="flex flex-wrap max-h-[85vh] overflow-y-auto">
        {data.photos.map((photo: any) => (
          <Card
            key={photo.id}
            title={photo.title}
            imgSrc={photo.thumbnailUrl}
            linkHref={`photos/${photo.id}`}
          />
        ))}
      </div>
      <Pagination
        page={data.page}
        pageCount={data.pageCount}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
    </div>
  );
};

export default Photos;
