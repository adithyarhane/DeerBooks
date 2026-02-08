import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    authors: [
      {
        name: { type: String, required: true },
        bio: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      index: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "At least one category is required",
      },
    },
    tags: [String],
    publisher: String,
    edition: String,
    language: {
      type: String,
      default: "English",
      index: true,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
    },
    publishedYear: String,
    pricing: {
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      discountPrice: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },
    inventory: {
      stock: {
        type: Number,
        default: 0,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
      lowStockThreshold: {
        type: Number,
        default: 5,
      },
    },
    images: {
      cover: {
        type: String,
        required: true,
      },
      gallery: [String],
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const bookModel = mongoose.models.book || mongoose.model("book", BookSchema);
export default bookModel;
