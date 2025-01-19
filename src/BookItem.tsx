import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import Cookies from "js-cookie";

interface BookItemProps {
  title: string;
  bookId: number;
  author: string;
  myRating?: number;
  avgRating?: number;
  publicationYear: number;
}

const BookItem: React.FC<BookItemProps> = ({
  title,
  bookId,
  author,
  myRating,
  avgRating,
  publicationYear,
}) => {
  const [hoverIdx, setHoverIdx] = useState(myRating ?? -1);

  const { mutateAsync: rateBook } = useRating(bookId);

  const handleRate = (rating: number) => {
    return rateBook(rating);
  };

  return (
    <div className="border p-4 rounded shadow-md flex flex-col gap-2">
      <div className="flex flex-row gap-2 justify-between">
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="">{author}</p>
          <p className="">{publicationYear}</p>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="flex flex-row gap-1">
            {new Array(5).fill(0).map((_, i) => (
              <div
                key={i}
                onClick={() => handleRate(i + 1)}
                onPointerOut={() => setHoverIdx(myRating ?? -1)}
                onPointerOver={() => setHoverIdx(i + 1)}
                className={classNames(
                  "w-4 h-4 rounded-full cursor-pointer",
                  hoverIdx !== -1 && hoverIdx - 1 >= i
                    ? "bg-yellow-400"
                    : "bg-gray-300"
                )}
              />
            ))}
          </div>
          <div>{(avgRating ?? 0).toFixed(2)} / 5.0</div>
          {myRating && (
            <span
              className="text-gray-400 text-sm cursor-pointer underline"
              onClick={() => handleRate(-1)}
            >
              Delete my rating
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const useRating = (bookId: number) => {
  const queryClient = useQueryClient();

  const mutationFn = async (rating: number) => {
    return axios.post(
      `${import.meta.env.VITE_API_URL}/rating`,
      { bookId, score: rating },
      { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
    );
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export default BookItem;
