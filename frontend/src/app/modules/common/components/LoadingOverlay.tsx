import React from "react";
import Spinner from "./Spinner";

interface Props {}

const LoadingOverlay: React.FC<Props> = () => {
  return (
    <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
      <div className="flex items-center">
        <span className="text-3xl mr-4">Loading</span>
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingOverlay;
