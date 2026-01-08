import React from "react";
import Book from "../../../Components/Book/Book";

const LatestBook = ({ books }) => {
  return (
    <div className="w-11/12 mx-auto my-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl  md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore Our Latest Arrivals
        </h2>
        <p className="mt-2 md:text-lg text-gray-500">
          Discover the newest books added to our collection
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default LatestBook;
