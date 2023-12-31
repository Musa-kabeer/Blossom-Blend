const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
     {
          review: {
               type: String,
               trim: true,
               required: [true, 'A review must have text'],
          },

          product: {
               type: mongoose.Schema.ObjectId,
               ref: 'Product',
               required: [true, 'A review must have product'],
          },

          rating: {
               type: Number,
               min: [1, 'Rating must be 1 or more'],
               max: [5, 'Rating must be 5 or less'],
               required: [true, 'A review must have rating'],
          },

          user: {
               type: mongoose.Schema.ObjectId,
               ref: 'User',
               required: [true, 'A review must have user'],
          },
     },
     { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
     this.find({}).populate('user');

     next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
