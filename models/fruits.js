//Step 1. import mongoose
const mongoose = require('mongoose');

//Step 2. create schema
const fruitSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

//Step 3. create model using schema
const Fruit = mongoose.model('Fruit', fruitSchema);

//Step 4. Export model
module.exports = Fruit;