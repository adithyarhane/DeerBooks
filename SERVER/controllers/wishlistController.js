import bookModel from "../models/bookModel.js";
import wishlistModel from "../models/wishlistModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const book = await bookModel.findOne({
      _id: bookId,
      isActive: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found or inactive",
      });
    }

    let wishlist = await wishlistModel.findOne({
      user: userId,
    });

    if (!wishlist) {
      wishlist = await wishlistModel.create({
        user: userId,
        items: [
          {
            book: bookId,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Book added to wishlist",
      });
    }

    const alreadyAdded = wishlist.items.some(
      (item) => item.book.toString() === bookId,
    );

    if (alreadyAdded) {
      return res.status(400).json({
        success: false,
        message: "Book already in wishlist",
      });
    }

    wishlist.items.push({ book: bookId });
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Book added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add book to wishlist",
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const wishlist = await wishlistModel.findOne({
      user: userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found.",
      });
    }

    const itemIndex = wishlist.items.findIndex(
      (item) => item.book.toString() === bookId,
    );

    if (itemIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Book not found in wishlist",
      });
    }

    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Book removed from wishlist",
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove book from wishlist",
    });
  }
};

export const getWishlistData = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await wishlistModel
      .findOne({
        user: userId,
      })
      .populate({
        path: "items.book",
        match: { isActive: true },
        select:
          "title slug pricing images ratings authors categories publishedYear language tags ",
      });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
      });
    }

    const items = wishlist.items.filter((item) => item.book !== null);

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};
