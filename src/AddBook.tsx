import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AddBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutateAsync: addBook, error } = useMutation({
    mutationKey: ["addBook"],
    mutationFn: async () => {
      const response = await axios.post(
        `${process.env.VITE_API_URL}/book`,
        { title, author, publishedYear: parseInt(publishedYear) },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return addBook();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-2xl font-bold">Add New Book</h1>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-col border p-6 rounded shadow-md w-96"
      >
        <div className="flex-1 w-full justify-between flex items-center">
          <label className="font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded p-1 w-64"
          />
        </div>

        <div className="flex-1 w-full justify-between flex items-center">
          <label className="font-medium">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="border rounded p-1 w-64"
          />
        </div>

        <div className="flex-1 w-full justify-between flex items-center">
          <label className="font-medium">Published Year:</label>
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
            className="border rounded p-1 w-64"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mt-4"
        >
          Add Book
        </button>

        {error && <p className="text-red-500">Failed to add book</p>}
      </form>
    </div>
  );
};

export default AddBook;
