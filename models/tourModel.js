const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'tour must have name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have lese or equle 40 caracter'],
      minlength: [6, 'A tour name must have more or equle 6 caracter'],
      // validate: validator.isAlpha,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either : easy, medium, difficult',
      },
    },
    ratingsAvrage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [1, 'Rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'tour must have price'],
    },
    priceDiscount: {
      type: Number,
      validate: function (val) {
        return val < this.price;
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have description!'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true],
    },
    images: [String],
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  { timestamps: true }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//! Document Middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//! Query Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliSeconds!`);
  console.log(docs);
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
