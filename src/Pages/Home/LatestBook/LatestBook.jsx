import React from "react";
import Book from "../../../Components/Book/Book";
import { Link } from "react-router";
import { motion } from "motion/react";

const LatestBook = ({ books }) => {
  return (
    <div className=" my-10 shadow-2xl p-6 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl  md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore Our Latest Arrivals
        </h2>
        <p className="mt-2 text-neutral font-bold">
          Discover the newest books added to our collection
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, i) => (
          <Book key={book._id} book={book} delay={i * 0.3}></Book>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link to={"/all-books"}>
          <motion.span
            whileHover={{
              rotateX: 20,
              rotateY: 15,
              boxShadow: "1px 3px 4px 1px 10px",
            }}
            style={{ transform: "translateZ(100px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="btn btn-xs md:btn-md btn-primary"
          >
            All Books
          </motion.span>
        </Link>
      </div>
    </div>
  );
};

export default LatestBook;
