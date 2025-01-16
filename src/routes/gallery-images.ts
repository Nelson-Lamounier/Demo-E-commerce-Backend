import express from "express"
import Image from "../model/product"
import {getProductByCategory} from "../controllers/product/product.controller"

const router = express.Router();

router.get("/products", getProductByCategory)

export default router;


