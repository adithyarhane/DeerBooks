import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
  },
  { _id: false },
);

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true,
    },

    items: [cartItemSchema],
    summary: {
      totalItems: {
        type: Number,
        default: 0,
      },
      totalQuantity: {
        type: Number,
        default: 0,
      },
      subtotal: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      totalPayable: {
        type: Number,
        default: 0,
      },
    },
    coupon: {
      code: String,
      discountAmount: Number,
    },
  },
  { timestamps: true },
);

const cartModel = mongoose.model("cart", CartSchema);
export default cartModel;
