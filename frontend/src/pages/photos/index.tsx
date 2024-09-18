import { Photos } from "@/app/modules/main/Photos";
import React from "react";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className="m-4">
      <Photos />
    </div>
  );
};

export default Home;
