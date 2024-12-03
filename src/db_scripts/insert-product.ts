import mongoose, { Schema, Document } from "mongoose";

import dotenv from "dotenv";

import Product from "../model/product";

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

// Define the images to insert or update
const categories = [
  {
    title: "Mens",
    items: [
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man01.png",
        name: "Casual Fit Shirt",
        description: "Comfortable casual shirt perfect for daily wear.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man02.png",
        name: "Slim Fit T-Shirt",
        description: "Modern slim fit T-shirt for casual outings.",
        price: 19.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man03.png",
        name: "Formal Suit Jacket",
        description: "Elegant formal jacket ideal for business meetings.",
        price: 99.99,
      },

      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man05.png",
        name: "Denim Jeans",
        description: "Durable denim jeans suitable for all occasions.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man06.png",
        name: "Puffer Jacket",
        description: "Warm puffer jacket for cold weather conditions.",
        price: 89.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man04.png",
        name: "Athletic Hoodie",
        description: "Cozy hoodie designed for comfort and performance.",
        price: 49.99,
      },
    ],
  },
  {
    title: "Womens",
    items: [
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman01.png",
        name: "Floral Summer Dress",
        description: "A lightweight floral dress for casual summer days.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman02.png",
        name: "Classic Denim Jacket",
        description: "A timeless denim jacket for layering and style.",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman03.png",
        name: "Casual White T-Shirt",
        description: "A soft and breathable white T-shirt for daily wear.",
        price: 19.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman04.png",
        name: "Athletic Yoga Pants",
        description: "Stretchable yoga pants perfect for workouts or lounging.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman05.png",
        name: "Knitted Cardigan",
        description: "A warm and cozy cardigan for chilly days.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman06.png",
        name: "Padded Winter Coat",
        description: "A padded winter coat to keep you warm in the cold.",
        price: 99.99,
      },
    ],
  },
  {
    title: "sales",
    items: [
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman07.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman09.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/woman/woman08.png",
        name: "Athletic Leggings",
        description: "Flexible leggings for workouts or casual outings.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man07.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man08.png",
        name: "Slim Fit T-Shirt",
        description: "Comfortable and stylish slim fit T-shirt.",
        price: 24.99,
      },
      {
        ImageUrl:
          "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man09.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
    ],
  },
];

// Insert or update images based on the new schema
const insertOrUpdateProduct = async (): Promise<void> => {
  await connectDB();

  try {
    for (const category of categories) {
      const { title: categoryName, items } = category;

      // Check if the category exists
      const existingCategory = await Product.findOne({
        title: categoryName,
      });

      if (existingCategory) {
        //Update the existing category's items
        existingCategory.items = items;
        await existingCategory.save();
        console.log(`Updated category: ${categoryName}`);
      } else {
        // Insert a new category with its items
        const newCategory = new Product({
          title: categoryName,
          items,
        });
        await newCategory.save();
        console.log(`Inserted new category: ${categoryName}`);
      }
    }
  } catch (err) {
    console.error(
      `Error while inserting/updating categories: ${(err as Error).message}`
    );
  } finally {
    mongoose.connection.close();
  }
};

insertOrUpdateProduct();

//       const query = { url: image.url };
//       const update = {
//         ...image,
//       };
//       const options = { upsert: true, new: true, setDefaultsOnInsert: true };

//       const updatedImage = await ImageModel.findOneAndUpdate(
//         query,
//         update,
//         options
//       );
//       if (updatedImage) {
//         console.log(`Updated image: ${updatedImage.title}`);
//       }
//     }
//   } catch (err) {
//     console.error(
//       `Error while inserting/updating images: ${(err as Error).message}`
//     );
//   } finally {
//     mongoose.connection.close();
//   }
// };

// // Run the function
// insertOrUpdateImages();

/*
1.	Direct Execution:
Run the script directly from the terminal:
npx ts-node src/db_scripts/insert-product.ts
*/

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man01.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man02.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man03.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man04.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man05.png"

// "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/man06.png"
