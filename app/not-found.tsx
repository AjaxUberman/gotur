import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className=" text-gotur-main text-3xl bg-white h-screen flex flex-col justify-center items-center gap-4">
      <h1> There is no page like this </h1>
      <Link
        href={"/"}
        className="border rounded-lg border-gotur-main px-4 py-1 hover:scale-110 transition duration-100 ease-in hover:bg-purple-100"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
