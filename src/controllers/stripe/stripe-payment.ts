import { RequestHandler } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    

});

export const createPaymentIntent: RequestHandler = async (req, res, next) => {
  try {
    const { amount,  shipping } = req.body;

    // Validate amount
    if (!Number.isInteger(amount) || amount <= 0) {
      res.status(400).json({ error: "Invalid amount. Must be a positive integer." });
      return;
    }

  
    // Validate shipping
    if (
      !shipping ||
      typeof shipping.name !== "string" ||
      typeof shipping.phone !== "string" ||
      !shipping.address ||
      typeof shipping.address.line1 !== "string" ||
      typeof shipping.address.city !== "string" ||
      typeof shipping.address.postal_code !== "string" ||
      typeof shipping.address.country !== "string"
    ) {
      res.status(400).json({ error: "Invalid shipping information" });
      return;
    }

    // Optional fields can default to empty strings
    const createPaymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      payment_method_types: ["card"],
      shipping: {
        name: shipping.name,
        address: {
          line1: shipping.address.line1,
          line2: shipping.address.line2 || "", // Default to empty string
          city: shipping.address.city,
          state: shipping.address.state || "", // Default to empty string
          postal_code: shipping.address.postal_code,
          country: shipping.address.country,
        },
        phone: shipping.phone,
      },
    });
    res.status(200).json({ paymentIntent: createPaymentIntent });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
    return;
  }
};
