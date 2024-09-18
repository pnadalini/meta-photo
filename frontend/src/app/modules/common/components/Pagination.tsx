import React from "react";

interface Props {
  page: number;
  pageCount: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Pagination: React.FC<Props> = ({ page, pageCount, onNextClick, onPrevClick }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing page <span className="font-semibold text-gray-900 dark:text-white">{page}</span>{" "}
          of <span className="font-semibold text-gray-900 dark:text-white">{pageCount}</span> pages
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={onPrevClick}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button
            onClick={onNextClick}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
