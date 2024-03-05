const router = require("express").Router();
const cartCtrl = require("../controller/addCart");

router.patch("/addcart/:id", cartCtrl.addCart);
router.post("/updatecart", cartCtrl.updateCart);
router.get("/getcart", cartCtrl.getCart);
router.delete("/deletecart/:id", cartCtrl.deleteCart);

module.exports = router;
