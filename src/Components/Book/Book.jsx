import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { motion } from "motion/react";

const Book = ({ book, delay = 0 }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <StyledWrapper>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.1, delay }}
        className="card"
      >
        {/* First content: full image */}
        <div className="first-content">
          <img src={book?.bookPhotoURL} alt="" />
        </div>

        {/* Second content: overlay with title + button */}
        <div className="second-content">
          <h3>{book?.bookName}</h3>
          <p>৳{book.price}</p>
          <Link to={`/book-details/${book?._id}`}>
            <button className="btn my-3">View Details</button>
          </Link>
        </div>
      </motion.div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    max-width: 380px;
    height: 380px;
    background: #243137;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.705);
    overflow: hidden;
    position: relative;
    transition: all 0.4s;
    cursor: pointer;
  }

  /* First content: full image */
  .first-content {
    height: 100%;
    width: 100%;
    transition: all 0.4s;
  }

  .first-content img {
    width: 100%;
    height: 100%;
    object-fit: center;
  }

  /* Second content: overlay with title + button */
  .second-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #243137;
    color: #fff;
    transition: all 0.4s;
    padding: 10px;
    text-align: center;
  }

  .second-content h3 {
    margin-bottom: 10px;
    font-size: 2rem;
    font-weight: 600;
  }
  .second-content p {
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .second-content .btn {
    padding: 6px 12px;
    border: none;
    background-color: #ff4757;
    color: #ffffff;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }

  /* Hover effect: show second content, hide first */
  .card:hover .first-content {
    opacity: 0;
  }

  .card:hover .second-content {
    height: 100%;
    opacity: 1;
  }
`;

export default Book;
