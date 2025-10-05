import mongoose from 'mongoose';
// import { CATEGORIES } from '../types/project';
import { CATEGORIES } from '@/app/types/project';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
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
  tech: {
    type: [String],
    required: [true, 'At least one technology is required'],
  },
  link: {
    type: String,
    required: [true, 'Project link is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: CATEGORIES,
    trim: true,
  },
  domainId: {
    type: String,
    required: [true, 'Domain ID is required'],
    trim: true,
  },
  order: {
    type: Number,
    required: [true, 'Display order is required'],
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema); 