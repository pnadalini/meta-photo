import React from "react";

interface Props {
  page: number;
  pageCount: number;
  children: React.ReactNode;
}

const PaginationContent: React.FC<Props> = ({ children, page, pageCount }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing page <span className="font-semibold text-gray-900 dark:text-white">{page}</span> of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{pageCount}</span> pages
      </span>
      <div className="inline-flex mt-2 xs:mt-0">{children}</div>
    </div>
  );
};

const PrevButton: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <button
      className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      {...props}
    />
  );
};

const NextButton: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <button
      className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      {...props}
    />
  );
};

export { PrevButton, NextButton, PaginationContent };
