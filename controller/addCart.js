const Cart = require("../model/CartModel");
const cartCtrl = {
  addCart: async (req, res) => {
    try {
      const { id, image, name, price, color, quantity } = req.body.cart;
      console.log(req.body.cart);
      // if (!quantity) {
      //   const newProduct = new Cart({
      //     id,
      //     image,
      //     name,
      //     price,
      //     color,
      //     // quantity: quantity,
      //   });
      //   await newProduct.save();
      // } else {
      await Cart.findOneAndUpdate(
        { id: id },
        {
          quantity: quantity,
        }
      );
      // }
      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCart: async (req, res) => {
    try {
      const { id, image, name, price, color } = req.body.product;
      console.log(req.body.product);
      const newProduct = new Cart({
        id,
        image,
        name,
        price,
        color,
        // quantity: quantity,
      });
      await newProduct.save();
      return res.json({ msg: "Added to cart" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getCart: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json({ carts });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCart: async (req, res) => {
    try {
      await Cart.findOneAndDelete({ id: req.params.id });
      return res.json({ msg: "Deleted success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = cartCtrl;
