import {Router} from "express"
import { createPaymentIntent } from "../controllers/stripe/stripe-payment"

const router = Router();

router.post("/create-payment-intent", createPaymentIntent)

export default router;