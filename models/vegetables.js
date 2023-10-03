//Step 1. import mongoose
const mongoose = require('mongoose');

//Step 2. create schema
const vegetableSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

//Step 3. create model using schema
const Vegetable = mongoose.model('Vegetable', vegetableSchema);

//Step 4. Export model
module.exports = Vegetable;