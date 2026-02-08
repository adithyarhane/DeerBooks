import bookModel from "../models/bookModel.js";
import cartModel from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, quantity = 1 } = req.body;

    // 1. Validate input
    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // 2. Check book exists and active
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

    // 3. Stock validation
    if (book.inventory.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // 4. Find or create cart
    let cart = await cartModel.findOne({
      user: userId,
    });

    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        items: [],
      });
    }

    // 5. Check if book already exists
    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId,
    );

    if (itemIndex > -1) {
      //Increase quantity
      cart.items[itemIndex].quantity += quantity;

      // Re-check stock
      if (cart.items[itemIndex].quantity > book.inventory.stock) {
        return res.status(400).json({
          success: false,
          message: "Quantity exceeds available stock",
        });
      }
    } else {
      // Add new item item with price snapshot
      cart.items.push({
        book: bookId,
        quantity,
        price: book.pricing.price,
        discountPrice: book.pricing.discountPrice,
      });
    }

    // 6. Recalculate cart summary
    let totalItems = cart.items.length;
    let totalQauntity = 0;
    let subtotal = 0;

    cart.items.forEach((item) => {
      const itemPrice = item.discountPrice ?? item.price;
      totalQauntity += item.quantity;
      subtotal += itemPrice * item.quantity;
    });

    cart.summary.totalItems = totalItems;
    cart.summary.totalQuantity = totalQauntity;
    cart.summary.subtotal = subtotal;
    cart.summary.discount = 0;
    cart.summary.totalPayable = subtotal;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Book added to cart",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add book to cart",
    });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    const { quantity } = req.body;

    // 1. Validate quantity

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be 0 or greater",
      });
    }

    // 2. Find cart

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // 3. Find item in cart

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Book not found in cart",
      });
    }

    // 4. if quantity is 0 -> remove item
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // 5 validate stock
      const book = await bookModel.findOne({ _id: bookId, isActive: true });

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found or inactive",
        });
      }

      if (quantity > book.inventory.stock) {
        return res.status(400).json({
          success: false,
          message: "Quantity exceeds available stock",
        });
      }

      // 6. Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    // 7. Recalculate cart summary
    let totalItems = cart.items.length;
    let totalQuantity = 0;
    let subtotal = 0;

    cart.items.forEach((item) => {
      const itemPrice = item.discountPrice ?? item.price;
      totalQuantity += item.quantity;
      subtotal += itemPrice * item.quantity;
    });

    cart.summary.totalItems = totalItems;
    cart.summary.totalQuantity = totalQuantity;
    cart.summary.subtotal = subtotal;
    cart.summary.discount = 0;
    cart.summary.totalPayable = subtotal;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      checkError: error.message,
      message: "Failed to update cart Item quantity",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    // 1. find cart
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // 2. FInd item index
    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId,
    );

    if (itemIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Book not found in cart",
      });
    }

    // 3. Remove item
    cart.items.splice(itemIndex, 1);

    // 4. Recalculate cart summary
    let totalItems = cart.items.length;
    let totalQuantity = 0;
    let subtotal = 0;

    cart.items.forEach((item) => {
      const itemPrice = item.discountPrice ?? item.price;
      totalQuantity += item.quantity;
      subtotal += itemPrice * item.quantity;
    });

    cart.summary.totalItems = totalItems;
    cart.summary.totalQuantity = totalQuantity;
    cart.summary.subtotal = subtotal;
    cart.discount = 0;
    cart.summary.totalPayable = subtotal;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Book removed from cart",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to remove book from cart",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    cart.summary = {
      totalItems: 0,
      totalQuantity: 0,
      subtotal: 0,
      discount: 0,
      tatalPayable: 0,
    };

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel.findOne({ user: userId }).populate({
      path: "items.book",
      match: { isActive: true },
      select:
        "title slug authors pricing images ratings categories publishedYear language",
    });

    // If cart does not exists
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
          summary: {
            totalItems: 0,
            totalQuantity: 0,
            subtotal: 0,
            discount: 0,
            totalPayable: 0,
          },
        },
      });
    }

    // Remove null books (soft-deleted books)
    const validItems = cart.items.filter((item) => item.book !== null);

    // Recalculate totals (safety check)
    let totalItems = validItems.length;
    let totalQuantity = 0;
    let subtotal = 0;

    validItems.forEach((item) => {
      const itemPrice = item.discountPrice ?? item.price;
      totalQuantity += item.quantity;
      subtotal += itemPrice * item.quantity;
    });

    cart.summary.totalItems = totalItems;
    cart.summary.totalQuantity = totalQuantity;
    cart.subtotal = subtotal;
    cart.discount = cart.summary.discount || 0;
    cart.summary.totalPayable = subtotal - cart.summary.discount;

    await cart.save();

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};
