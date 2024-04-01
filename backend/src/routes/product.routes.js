import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addProduct } from "../controllers/product.controller.js";
import { isSeller } from "../middleware/product.middleware.js";


const router = Router();

router.route("/add-product").post(verifyJWT, isSeller, addProduct);

export default router;