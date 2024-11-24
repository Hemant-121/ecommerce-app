import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addReview, getProductReviews } from "../controllers/review.controller.js";


const router = Router();


router.route("/addreview/:productId").post(verifyJWT, addReview);
router.route("/reviews/:productId").get(getProductReviews);


export default router;