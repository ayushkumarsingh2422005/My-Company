import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  company: String,
  serviceType: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  timeline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: String,
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'cancelled'],
    default: 'new'
  },
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update lastUpdated timestamp before saving
contactSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Add text index for search
contactSchema.index({
  name: 'text',
  email: 'text',
  phone: 'text',
  company: 'text',
  description: 'text',
  requirements: 'text'
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact; 