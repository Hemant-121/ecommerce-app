import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct, getProducts } from "../controllers/product.controller.js";
import { isSeller } from "../middleware/product.middleware.js";


const router = Router();

router.route("/add-product").post(verifyJWT, isSeller, addProduct);
router.route("/all-product").get( getProducts);

export default router;