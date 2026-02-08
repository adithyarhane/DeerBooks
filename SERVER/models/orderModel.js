import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: Number,
  },
  { _id: false },
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    items: [orderItemSchema],
    pricing: {
      subtotal: {
        type: Number,
        required: true,
      },
      discount: { type: Number, default: 0 },
      shipping: { type: Number, default: 0 },
      totalPayable: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "out for delivery",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
      index: true,
    },
    payment: {
      method: {
        type: String,
        enum: ["cod", "card", "upi", "netbacking", "razorpay"],
      },
      transactionId: String,
      status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
      },
      paidAt: Date,
    },
    shippingAddress: {
      name: String,
      phone: String,
      streetAddress: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: "India" },
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
    expectedDeliveryDate: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("order", OrderSchema);

export default orderModel;
