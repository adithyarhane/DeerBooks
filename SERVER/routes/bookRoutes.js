import express from "express";
import {
  addBook,
  getBestsellers,
  getBook,
  getBooks,
  getBooksForEveryone,
  getNewReleases,
  getRelatedBooks,
} from "../controllers/bookController.js";
import userAuth from "../middleware/userAuth.js";

const bookRouter = express.Router();

bookRouter.route("/add-book").post(userAuth, addBook);
bookRouter.route("/archieve").post(getBooks);
bookRouter.route("/get-book/:slug").get(getBook);
bookRouter.route("/related-books/:slug").get(getRelatedBooks);
bookRouter.route("/bestsellers").post(getBestsellers);
bookRouter.route("/new-releases").post(getNewReleases);
bookRouter.route("/books-for-everyone").post(getBooksForEveryone);

export default bookRouter;
