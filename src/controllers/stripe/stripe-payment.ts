import { RequestHandler } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    

});

export const createPaymentIntent: RequestHandler = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;

    if (typeof amount !== "number" || !currency) {
      res.status(400).json({ error: "Invalid input data" });
      return;
    }
    const createPaymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      payment_method_types: ["card"],
    });
    res.status(200).json({ paymentIntent: createPaymentIntent });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
    return;
  }
};
