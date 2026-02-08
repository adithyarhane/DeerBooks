import bookModel from "../models/bookModel.js";
import cartModel from "../models/CartModel.js";
import orderModel from "../models/orderModel.js";
import generateOrderId from "../utils/generateOrderId.js";

export const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod, shippingAddress } = req.body;

    // fetch cart
    const cart = await cartModel.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 2. validate stock & prepare order items
    const orderItems = [];

    for (const item of cart.items) {
      const book = await bookModel.findOne({
        _id: item.book,
        isActive: true,
      });

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found or inactive",
        });
      }

      if (item.quantity > book.inventory.sotck) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${book.title}`,
        });
      }

      orderItems.push({
        book: book._id,
        title: book.title,
        quantity: item.quantity,
        price: item.price,
        discountPrice: item.discountPrice,
      });
    }

    const subtotal = cart.summary.subtotal;
    const discount = cart.summary.discount || 0;
    const shipping = 0;
    const totalPayable = subtotal - discount + shipping;

    // create order
    const order = await orderModel.create({
      orderId: generateOrderId(),
      user: userId,
      items: orderItems,
      pricing: {
        subtotal,
        discount,
        shipping,
        totalPayable,
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === "cod" ? "pending" : "pending",
      },
      shippingAddress,
      expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });

    // reduce stock
    for (const item of cart.items) {
      await bookModel.findByIdAndUpdate(item.book, {
        $inc: { "inventory.stock": -item.quantity },
      });
    }

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ user: userId, isActive: true, status: { $ne: "pending" } })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.book",
        select: "title images.cover slug",
      })
      .select(
        "items pricing status placedAt expectedDeliveryDate deliveredAt orderId",
      );

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await orderModel
      .findOne({ _id: orderId, isActive: true })
      .populate({
        path: "items.book",
        select: "title slug images categories language",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const isOwner = order.user.toString() === userId.toString();

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        messager: "Not authorized to view this order",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
