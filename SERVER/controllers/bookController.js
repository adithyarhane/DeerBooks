import bookModel from "../models/bookModel.js";
import slugify from "slugify";
import userModel from "../models/userModel.js";

export const addBook = async (req, res) => {
  const userId = req.user.id;
  try {
    const {
      title,
      authors,
      description,
      categories,
      publisher,
      edition,
      language,
      isbn,
      publishedYear,
      pricing,
      inventory,
      images,
      ratings,
      tags,
      seo,
      isFeatured,
      isBestseller,
    } = req.body;

    if (
      !title ||
      !authors ||
      !description ||
      !categories ||
      !pricing.price ||
      !images?.cover
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const user = await userModel.findOne({ _id: userId }).select("type");
    if (user.type !== "admin") {
      return res.json({
        success: false,
        message: "Only Admin can add book.",
      });
    }

    const slug = slugify(title, { lower: true, strict: true });

    //Check duplicate book (by slug or ISBN)
    const existingBook = await bookModel.findOne({
      $or: [{ slug }, { isbn }],
    });

    if (existingBook) {
      return res.status(409).json({
        success: true,
        message: "Book already exists",
      });
    }

    const book = await bookModel.create({
      title,
      slug,
      authors,
      description,
      categories: categories.map((c) => c.toLowerCase().trim()),
      publisher,
      edition,
      language,
      isbn,
      publishedYear,
      pricing,
      inventory,
      images,
      ratings,
      tags,
      seo,
      isFeatured,
      isBestseller,
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Interal server error",
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      language,
      search,
      sort,
    } = req.body;

    // Base filter
    const filter = {
      isActive: true,
    };

    // Category filter (array-based)
    if (category && category.toLowerCase() !== "all") {
      filter.categories = category.toLowerCase();
    }

    // Language filter
    if (language) {
      filter.language = language;
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter["pricing.price"] = {};
      if (minPrice) filter["pricing.price"].$gte = Number(minPrice);
      if (maxPrice) filter["pricing.price"].$lte = Number(minPrice);
    }

    // search filter (title + author)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { publisher: { $regex: search, $options: "i" } },
        { edition: { $regex: search, $options: "i" } },
        { language: { $regex: search, $options: "i" } },
        { publishedYear: { $regex: search, $options: "i" } },
        { "authors.name": { $regex: search, $options: "i" } },
        { "sero.metaTitle": { $regex: search, $options: "i" } },
        { "sea.metaDescription": { $regex: search, $options: "i" } },
        { "sea.keywords": { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { categories: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting logic
    let sortBy = { createdAt: -1 };
    if (sort === "price") sortBy = { "pricing.price": 1 };
    if (sort === "-price") sortBy = { "pricing.price": -1 };
    if (sort === "-rating") sortBy = { "ratings.average": -1 };

    // pagination
    const skip = (Number(page) - 1) * Number(limit);

    const books = await bookModel
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(Number(limit));

    const totalBooks = await bookModel.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalBooks,
      currenPage: Number(page),
      totalPages: Math.ceil(totalBooks / limit),
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Failed to fetch books",
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const { slug } = req.params;

    const book = await bookModel.findOne({
      slug: slug,
      isActive: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch book",
    });
  }
};

export const getRelatedBooks = async (req, res) => {
  try {
    const { slug } = req.params;
    const limit = 5;

    const currentBook = await bookModel.findOne({
      slug,
      isActive: true,
    });

    if (!currentBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const relatedBooks = await bookModel
      .find({
        _id: { $ne: currentBook._id },
        categories: { $ne: currentBook.categories },
        isActive: true,
      })
      .limit(limit)
      .sort({ "ratings.average": -1 });

    return res.status(200).json({
      success: true,
      count: relatedBooks.length,
      data: relatedBooks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch related books",
    });
  }
};

export const getBestsellers = async (req, res) => {
  try {
    const limit = Number(req.body.limit) || 10;

    const books = await bookModel
      .find({
        isActive: true,
        isBestseller: true,
        "inventory.stock": { $gt: 0 },
      })
      .sort({
        "ratings.count": -1,
        "ratings.average": -1,
        createdAt: -1,
      })
      .limit(limit)
      .select(
        "title slug authors pricing images.cover ratings categories publishedYear",
      );

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch best sellers",
    });
  }
};

export const getNewReleases = async (req, res) => {
  try {
    const limit = Number(req.body.limit) || 10;

    const books = await bookModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select(
        "title slug authors pricing images description ratings publishedYear categories isFeatured",
      );

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch new releases",
    });
  }
};

export const getBooksForEveryone = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const books = await bookModel
      .find({
        isActive: true,
        categories: { $in: ["everyone"] },
        "inventory.isAvailable": true,
      })
      .sort({
        "ratings.average": -1,
        "ratings.count": -1,
      })
      .limit(limit)
      .select(
        "title slug authors pricing images ratings categories publishedYear",
      );

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch books for everyone",
    });
  }
};
