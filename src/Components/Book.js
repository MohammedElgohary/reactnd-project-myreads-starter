import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

const Shelves = [
  {
    id: "currentlyReading",
    title: "Currently Reading",
  },
  {
    id: "wantToRead",
    title: "Want to Read",
  },
  {
    id: "read",
    title: "Read",
  },
  {
    id: "none",
    title: "None",
  },
];

export const Book = ({ book, changeBookShelf, t }) => {
  return (
    <div className="book">
      <div className="book-top">
        <Link
          to={{ pathname: `/book/${book.id}`, state: book }}
          className="book-cover"
          style={{
            width: 128,
            height: 174,
            backgroundImage: `url(${
              book.imageLinks && book.imageLinks.thumbnail
                ? book.imageLinks.thumbnail
                : ""
            })`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf}
            onChange={(e) => {
              changeBookShelf(book, e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="move" disabled>
              {t("Move to...")}
            </option>
            {Shelves.map((shelf) => (
              <option key={shelf.id} value={shelf.id}>
                {book.shelf === shelf.id && "* "}
                {t(shelf.title)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors ? (
          book.authors.map((author, index) => (
            <span key={book.title + author + index}>{author}</span>
          ))
        ) : (
          <span>{t("No author")}</span>
        )}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: ProtoTypes.object.isRequired,
  changeBookShelf: ProtoTypes.func.isRequired,
  t: ProtoTypes.func.isRequired,
};
