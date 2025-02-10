const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const Review =require("./review.js");

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    country: String,
    location: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){ 
        await Review.deleteMany({_id :{$in : listing.reviews}});
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
