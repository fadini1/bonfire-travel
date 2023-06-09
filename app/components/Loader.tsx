'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <PuffLoader
        size={60}
        color="lightblue"
      />
    </div>
  )
};

export default Loader;