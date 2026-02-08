import express from "express";
import {
  addReview,
  deleteOwnReview,
  getReviewsByBook,
} from "../controllers/reviewController.js";
import userAuth from "../middleware/userAuth.js";

const reviewRouter = express.Router();

reviewRouter.route("/get-reviews/:bookId").post(getReviewsByBook);
reviewRouter.route("/add-review/:bookId").post(userAuth, addReview);
reviewRouter
  .route("/delete-review/:reviewId")
  .delete(userAuth, deleteOwnReview);

export default reviewRouter;
