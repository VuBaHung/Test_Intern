const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
  },
  color: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
module.exports = mongoose.model("Cart", cartSchema);
