import mongoose, { Schema } from 'mongoose';

const MediaContactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
  },
  budget: {
    type: String,
    required: [true, 'Budget information is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.MediaContact || mongoose.model('MediaContact', MediaContactSchema);
