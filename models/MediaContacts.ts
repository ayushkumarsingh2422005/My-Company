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
    default: '',
  },
  // Quote / package selection
  editType: {
    type: String,
    enum: ['social', 'recorded', 'motion', 'voice', 'custom', ''],
    default: '',
  },
  editTypeLabel: {
    type: String,
    default: '',
  },
  videoCount: {
    type: Number,
    default: 0,
  },
  packPrice: {
    type: Number,
    default: 0,
  },
  languageAddon: {
    type: Boolean,
    default: false,
  },
  languageCount: {
    type: Number,
    default: 0,
  },
  languageAddonUnit: {
    type: Number,
    default: 0,
  },
  languages: {
    type: String,
    default: '',
  },
  estimatedTotal: {
    type: Number,
    default: 0,
  },
  budget: {
    type: String,
    default: '',
  },
  timeline: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  requirements: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    enum: ['pricing', 'contact', 'modal', 'other'],
    default: 'other',
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'quoted', 'won', 'lost'],
    default: 'new',
  },
  notes: [
    {
      content: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

MediaContactSchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

MediaContactSchema.index({
  name: 'text',
  email: 'text',
  phone: 'text',
  company: 'text',
  description: 'text',
  requirements: 'text',
  editTypeLabel: 'text',
});

export default mongoose.models.MediaContact || mongoose.model('MediaContact', MediaContactSchema);
