import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Header from "./Header";
import { logOut } from "./utils";
import { Book } from "./App";
import BookItem from "./BookItem";

const MyBooks: React.FC = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const { data: books, isLoading } = useMyBooks(token);
  const { mutateAsync: deleteBook } = useDeleteBook(token);

  const handleDelete = (bookId: number) => {
    return deleteBook(bookId);
  };

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-1/2 gap-2 my-4">
          {isLoading && <div>Loading...</div>}

          {books?.map((book) => {
            return (
              <BookItem
                key={`${book.BookID}-${book.myRating}`}
                bookId={book.BookID}
                title={book.Title}
                author={book.Author}
                myRating={book.myRating}
                avgRating={book.avgRating}
                publicationYear={book.PublicationYear}
                onDelete={() => handleDelete(book.BookID)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const useMyBooks = (token: string | undefined) => {
  const queryFn = () => {
    return axios
      .get<Book[]>(`${import.meta.env.VITE_API_URL}/my-books`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  };

  return useQuery({
    queryKey: ["books", "my"],
    queryFn,
    enabled: !!token,
  });
};

const useDeleteBook = (token: string | undefined) => {
  const queryClient = useQueryClient();

  const mutationFn = (bookId: number) => {
    return axios.delete(
      `${import.meta.env.VITE_API_URL}/books/${bookId}`,

      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export default MyBooks;
