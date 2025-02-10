// Import the Express module and create a new router
const express = require("express");
const router = express.Router();

// Import the wrapAsync function to handle async errors
const wrapAsync = require("./utils/wrapasync.js");

// Import the ExpressError class to handle custom errors
const ExpressError = require("./utils/ExpressError.js");

// Import the listingSchema and reviewSchema from the Schema.js file
const { listingSchema } = require("./Schema.js");

// Import the Listing model from the models/listing.js file
const Listing = require("./models/listing.js");

// Define a middleware function to validate listing data
const validateListing = (req, res, next) => {
  // Validate the listing data using the listingSchema
  let { error } = listingSchema.validate(req.body);
  
  // If the data is invalid, throw an ExpressError with a 400 status code and an error message
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    // If the data is valid, call the next middleware function
    next();
  }
};

// Define a route to list all listings
router.get("/", wrapAsync(async (req, res) => {
  // Retrieve all listings from the database
  const allListings = await Listing.find({});
  
  // Render the index.ejs template with the listings data
  res.render("listings/index.ejs", { allListings });
}));

// Define a route to display the new listing form
router.get("/new", (req, res) => {
  // Render the new.ejs template
  res.render("listings/new");
});

// Define a route to show a single listing
router.get("/:id", wrapAsync(async (req, res) => {
  // Retrieve the listing ID from the URL parameter
  const { id } = req.params;
  
  // Retrieve the listing from the database and populate the reviews
  const listing = await Listing.findById(id).populate("reviews");
  
  // If the listing is not found, throw an ExpressError with a 404 status code
  if (!listing) {
    req.flash("error","Listing You requested for does not exist")
    res.redirect("/listings");
  }
  
  // Render the show.ejs template with the listing data
  res.render("listings/show", { listing });
}));

// Define a route to create a new listing
router.post("/", validateListing, wrapAsync(async (req, res) => {
  // Create a new listing using the validated data
  const newListing = new Listing(req.body.listing);
  
  // Save the listing to the database
  await newListing.save();
  req.flash("success","New Listing Created!");
  
  // Redirect to the listings page
  res.redirect("/listings");
}));

// Define a route to display the edit listing form
router.get("/:id/edit", wrapAsync(async (req, res) => {
  // Retrieve the listing ID from the URL parameter
  const { id } = req.params;
  
  // Retrieve the listing from the database
  const listing = await Listing.findById(id);
  
  // If the listing is not found, throw an ExpressError with a 404 status code
  if (!listing) {
    req.flash("error","Listing You requested for does not exist")
  }
  
  // Render the edit.ejs template with the listing data
  res.render("listings/edit", { listing });
}));

// Define a route to update a listing
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
  // Retrieve the listing ID from the URL parameter
  const { id } = req.params;
  
  // Update the listing using the validated data
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
  // Redirect to the listing page
  res.redirect(`/listings/${id}`);
}));

// Define a route to delete a listing
router.delete("/:id", wrapAsync(async (req, res) => {
  // Retrieve the listing ID from the URL parameter
  const { id } = req.params;
  
  // Delete the listing from the database
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted");
  // Redirect to the listings page
  res.redirect("/listings");
}));

// Export the router as a module
module.exports = router;