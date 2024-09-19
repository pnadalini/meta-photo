import Link, { LinkProps } from "next/link";
import React from "react";

const Card: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      {...props}
    />
  );
};

interface LinkCardProps extends LinkProps {
  children: React.ReactNode;
}

const LinkCard: React.FC<LinkCardProps> = (props) => {
  return (
    <Link
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      {...props}
    />
  );
};

interface CardImageProps {
  src: string;
  alt: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center">
      <img className="rounded-t-lg" src={src} alt={alt} />
    </div>
  );
};
interface CardContentProps {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return (
    <div className="p-5">
      <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">{children}</h5>
    </div>
  );
};

export { Card, CardImage, CardContent, LinkCard };
