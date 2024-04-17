import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct, getProducts, selllerProducts, getProduct, updateProduct, getCategory, deleteProduct, addToWishlist, isLiked } from "../controllers/product.controller.js";
import { isSeller } from "../middleware/product.middleware.js";


const router = Router();

router.route("/add-product").post(verifyJWT, isSeller, addProduct);
router.route("/all-product").get( getProducts);
router.route("/user-product/:id").get(verifyJWT, isSeller, selllerProducts);
router.route("/get-product/:id").get(getProduct);
router.route("/get-category/:id").get(getCategory);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(verifyJWT, deleteProduct);
router.route("/wishlist/:id").post(verifyJWT, addToWishlist);
router.route("/isLiked/:id").get(verifyJWT, isLiked);

export default router;