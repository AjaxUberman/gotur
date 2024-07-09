import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-gotur-main">
      <h1> There is no page like this </h1>
      <Link href={"/"}>Go Home</Link>
    </div>
  );
};

export default NotFound;
