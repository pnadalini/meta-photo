import Link from "next/link";
import React from "react";

interface Props {
  imgSrc: string;
  title: string;
  linkHref: string;
}

const Card: React.FC<Props> = ({ imgSrc, title, linkHref }) => {
  return (
    <Link
      href={linkHref}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <img className="rounded-t-lg" src={imgSrc} alt="Preview" />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default Card;
