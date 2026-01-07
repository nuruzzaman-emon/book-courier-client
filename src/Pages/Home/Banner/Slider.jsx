import React from "react";
import { Link } from "react-router";

const Slider = ({ book }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden w-full h-82 flex flex-col md:flex-row">
      {/* Book Image */}
      <div className="md:w-1/2 h-48 md:h-auto">
        <img
          src={book.bookPhotoURL}
          alt={book.bookName}
          className="w-full h-80  hover:scale-105 transition-transform duration-300"
        />
      </div>


      {/* Info */}
      <div className="p-6 md:w-1/2 flex flex-col justify-between bg-base-300">
        <div>
          <h2 className="text=xl md:text-2xl font-bold text-primary mb-2">
            {book.bookName}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {book.description}
          </p>
        </div>

        <div className="mt-auto">
          <Link
            to="/all-books"
            className="btn btn-primary md:px-6 md:py-2 hover:bg-secondary transition-colors duration-300"
          >
            See All Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slider;
