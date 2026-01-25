import React from "react";
import { Link } from "react-router";

const Slider = ({ book }) => {
  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden w-full flex flex-col md:flex-row p-1 md:p-4 bg-purple-300 ">
      {/* Image */}
      <div className="md:w-1/2 w-full md:h-80 overflow-hidden  flex-1">
        <img
          src={book.bookPhotoURL}
          alt={book.bookName}
          className="w-full h-28 md:h-80 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="md:p-6 flex flex-col justify-between bg-base-300 w-full flex-1">
        <div>
          <h2 className="text-xs md:text-2xl font-bold text-primary mb-2">
            {book.bookName}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 hidden md:block">
            {book?.description.slice(0, 200)}...
          </p>
        </div>

        <div className=" md:my-auto">
          <Link
            to="/all-books"
            className="btn btn-xs md:btn-md btn-primary  py-4  md:px-6 md:py-2 hover:bg-secondary transition-colors duration-300 mb-2"
          >
            See All Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slider;
