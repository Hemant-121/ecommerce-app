import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct, getProducts, selllerProducts } from "../controllers/product.controller.js";
import { isSeller } from "../middleware/product.middleware.js";


const router = Router();

router.route("/add-product").post(verifyJWT, isSeller, addProduct);
router.route("/all-product").get( getProducts);
router.route("/user-product/:id").get(verifyJWT, isSeller, selllerProducts);


export default router;