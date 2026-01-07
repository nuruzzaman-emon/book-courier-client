import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const Book = ({ book }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {/* First content: full image */}
        <div className="first-content">
          <img src={book?.bookPhotoURL} alt="" />
        </div>

        {/* Second content: overlay with title + button */}
        <div className="second-content">
          <h3>{book?.bookName}</h3>
          <p>Published At: {new Date(book?.createdAt).toLocaleDateString()}</p>
          <Link to={`/dashboard/book-details/${book?._id}`}>
            <button className="btn my-3">View Details</button>
          </Link>
        </div>
      </div>
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

  .card:hover {
    transform: scale(.90);
    border-radius: 15px;
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
    object-fit: cover;
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
