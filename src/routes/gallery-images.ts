import express from "express"
import Image from "../model/product"
import {getProductByCategory} from "../controllers/product/product.controller"

const router = express.Router();

router.get("/products", getProductByCategory)

export default router;


// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman01.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman02.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman03.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman04.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman05.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman06.png

// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman07.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman09.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman08.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man07.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man08.png
// https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man09.png