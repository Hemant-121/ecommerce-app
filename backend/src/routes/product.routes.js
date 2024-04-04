import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct, getProducts, selllerProducts, getProduct, updateProduct, getCategory, deleteProduct } from "../controllers/product.controller.js";
import { isSeller } from "../middleware/product.middleware.js";


const router = Router();

router.route("/add-product").post(verifyJWT, isSeller, addProduct);
router.route("/all-product").get( getProducts);
router.route("/user-product/:id").get(verifyJWT, isSeller, selllerProducts);
router.route("/get-product/:id").get(verifyJWT, getProduct);
router.route("/get-category/:id").get(getCategory);
router.route("/update-product/:id").put(verifyJWT, updateProduct);
router.route("/delete-product/:id").delete(verifyJWT, deleteProduct);

export default router;