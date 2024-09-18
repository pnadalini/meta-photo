import Photo from "@/app/modules/main/Photo";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const PhotoDetails: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <div>
      <Photo id={router.query.id!.toString()} />
    </div>
  );
};

export default PhotoDetails;
