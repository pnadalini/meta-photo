import Spinner from "@/app/modules/common/components/Spinner";
import Photo from "@/app/modules/main/Photo";
import { useRouter } from "next/router";
import React from "react";

interface Props {}

const PhotoDetails: React.FC<Props> = () => {
  const router = useRouter();

  if (!router.isReady || !router.query.id) {
    return <Spinner />;
  }
  return (
    <main>
      <Photo id={router.query.id.toString()} />
    </main>
  );
};

export default PhotoDetails;
