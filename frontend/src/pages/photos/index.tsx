import { Photos } from "@/app/modules/main/Photos";
import React from "react";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <main className="m-4">
      <Photos />
    </main>
  );
};

export default Home;
