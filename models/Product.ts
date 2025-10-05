import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minLength: [3, 'Title must be at least 3 characters long'],
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minLength: [10, 'Description must be at least 10 characters long'],
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    publicId: {
      type: String,
      required: [true, 'Image public ID is required'],
    },
  },
  features: [{
    type: String,
    required: true,
    trim: true
  }],
  link: {
    type: String,
    required: [true, 'Product link is required'],
    trim: true
  },
  gradient: {
    type: String,
    required: [true, 'Gradient style is required'],
    trim: true,
    default: 'from-purple-500 to-pink-500'
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 