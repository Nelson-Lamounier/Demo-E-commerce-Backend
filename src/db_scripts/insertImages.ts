import mongoose, { Schema, Document } from "mongoose";

import dotenv from "dotenv";

import ImageModel, { Image, ImageInput } from "../model/image";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(" MONGO_URI is not define on the environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(`Database connection error: ${(err as Error).message}`);
    process.exit(1);
  }
};

const insertOrUpdateImages = async (): Promise<void> => {
  await connectDB();

  const images: ImageInput[] = [
    {
      url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man01.png",
      title: "Casual Fit Shirt",
      description: "Comfortable casual shirt perfect for daily wear.",
      category: "Men",
      price: 29.99,
    },
    {
      url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man02.png",
      title: "Slim Fit T-Shirt",
      description: "Modern slim fit T-shirt for casual outings.",
      category: "Men",
      price: 19.99,
    },
    {
      url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man03.png",
      title: "Formal Suit Jacket",
      description: "Elegant formal jacket ideal for business meetings.",
      category: "Men",
      price: 99.99,
    },
    {
      url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man04.png",
      title: "Athletic Hoodie",
      description: "Cozy hoodie designed for comfort and performance.",
      category: "Men",
      price: 49.99,
    },
    {
      url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man05.png",
      title: "Denim Jeans",
      description: "Durable denim jeans suitable for all occasions.",
      category: "Men",
      price: 39.99,
    },
    {
      url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man06.png",
      title: "Puffer Jacket",
      description: "Warm puffer jacket for cold weather conditions.",
      category: "Men",
      price: 89.99,
    },
  ];
  try {
    for (const image of images) {
      const query = { url: image.url };
      const update = {
        ...image
      };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const updatedImage = await ImageModel.findOneAndUpdate(
        query,
        update,
        options
      );
      if (updatedImage) {
        console.log(`Updated image: ${updatedImage.title}`);
      }
    }
  } catch (err) {
    console.error(
      `Error while inserting/updating images: ${(err as Error).message}`
    );
  } finally {
    mongoose.connection.close();
  }
};

// Run the function
insertOrUpdateImages();

/*
1.	Direct Execution:
Run the script directly from the terminal:
npx ts-node src/scripts/insertOrUpdateImages.ts
*/

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man01.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man02.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man03.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man04.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man05.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man06.png"
