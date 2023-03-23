import mongoose from "mongoose";
const {
  ObjectId
} = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  reviewBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  review: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  rating: {
    type: String,
  },
  images: [],
  likes: [],
})
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    ref: "Category",
  },
  subCategories: [{
    type: ObjectId,
    ref: 'subCategory'
  }],
  questions: [{
    question: String,
    answer: String,
  }],
  reviews: [reviewSchema],
  refoundPolicy: {
    type: String,
    default: "30 days",
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  shipping: {
    type: String,
    required: true,
    default: 0,
  },
  subProduct: [{
    images: [],
    description_images: [],
    color: {
      color: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    size: [{
      size: String,
      qty: Number,
      price: Number,
    }, ],
    discount: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
  }, ],
}, {
  timestamps: true,
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;