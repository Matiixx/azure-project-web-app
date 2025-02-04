import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./App.css";
import { logOut } from "./utils";

import Header from "./Header";
import axios from "axios";
import BookItem from "./BookItem";

export type Book = {
  BookID: number;
  Title: string;
  Author: string;
  PublicationYear: number;
  AddedBy: number;
  AddedAt: string;
  myRating?: number;
  avgRating?: number;
};

function App() {
  const navigate = useNavigate();

  const isLoggedIn = Cookies.get("token");

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axios.get<Book[]>(
        `${import.meta.env.VITE_API_URL}/books`,
        { headers: { Authorization: `Bearer ${isLoggedIn}` } }
      );
      return response.data;
    },
    enabled: !!isLoggedIn,
  });

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

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
                title={book.Title}
                bookId={book.BookID}
                author={book.Author}
                myRating={book.myRating}
                avgRating={book.avgRating}
                publicationYear={book.PublicationYear}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
