import React from "react";

interface BookItemProps {
  author: string;
  title: string;
  publicationYear: number;
}

const BookItem: React.FC<BookItemProps> = ({
  author,
  title,
  publicationYear,
}) => {
  return (
    <div className="border p-4 rounded shadow-md flex flex-col gap-2">
      <h2 className="font-bold">{title}</h2>
      <p className="">{author}</p>
      <p className="">{publicationYear}</p>
    </div>
  );
};

export default BookItem;
