const express = require("express");
const router = express.Router();
const wrapAsync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./Schema.js");
const Review = require("./models/review.js");
const Listing = require("./models/listing.js");

const validateReview = (req, res, next) => {
    // Validate the review using reviewSchema
    let { error } = reviewSchema.validate(req.body.review); 
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// POST route to add a review
router.post("/:id/reviews", validateReview, wrapAsync(async (req, res) => {
    // Find the listing by ID
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }
    // Create a new review and associate it with the listing
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}));

// DELETE route to delete a review
router.delete("/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    // Find the listing by ID
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }
    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new ExpressError("Review not found", 404);
    }
    // Remove the review from the listing and delete the review document
    listing.reviews.pull(reviewId);
    await listing.save();
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
