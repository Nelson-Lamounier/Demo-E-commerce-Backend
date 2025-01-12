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
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product1.png",
        name: "Casual Fit Shirt",
        description: "Comfortable casual shirt perfect for daily wear.",
        price: 29.99,
      },

      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product5.png",
        name: "Puffer Jacket",
        description: "Warm puffer jacket for cold weather conditions.",
        price: 89.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product6.png",
        name: "Athletic Hoodie",
        description: "Cozy hoodie designed for comfort and performance.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product7.png",
        name: "Athletic Hoodie",
        description: "Cozy hoodie designed for comfort and performance.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product8.png",
        name: "Athletic Hoodie",
        description: "Cozy hoodie designed for comfort and performance.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product9.png",
        name: "Athletic Hoodie",
        description: "Cozy hoodie designed for comfort and performance.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product10.png",
        name: "Athletic Hoodie",
        description: "Cozy hoodie designed for comfort and performance.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product11.png",
        name: "Athletic Hoodie",
        description: "Cozy hoodie designed for comfort and performance.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product12.png",
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
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women2.png",
        name: "Classic Denim Jacket",
        description: "A timeless denim jacket for layering and style.",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women3.png",
        name: "Casual White T-Shirt",
        description: "A soft and breathable white T-shirt for daily wear.",
        price: 19.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women4.png",
        name: "Athletic Yoga Pants",
        description: "Stretchable yoga pants perfect for workouts or lounging.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women5.png",
        name: "Knitted Cardigan",
        description: "A warm and cozy cardigan for chilly days.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women6.png",
        name: "Padded Winter Coat",
        description: "A padded winter coat to keep you warm in the cold.",
        price: 99.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women7.png",
        name: "Padded Winter Coat",
        description: "A padded winter coat to keep you warm in the cold.",
        price: 99.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women8.png",
        name: "Padded Winter Coat",
        description: "A padded winter coat to keep you warm in the cold.",
        price: 99.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women9.png",
        name: "Padded Winter Coat",
        description: "A padded winter coat to keep you warm in the cold.",
        price: 99.99,
      },

      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women11.png",
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
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product2.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product3.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women10.png",
        name: "Athletic Leggings",
        description: "Flexible leggings for workouts or casual outings.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/products/catalog-women1.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/products/mens-product4.png",
        name: "Slim Fit T-Shirt",
        description: "Comfortable and stylish slim fit T-shirt.",
        price: 24.99,
      },

    ],
  },
  {
    title: "Accessories01",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesorios1.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesorios2.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesorios4.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesories9.png",
        name: "Slim Fit T-Shirt",
        description: "Comfortable and stylish slim fit T-shirt.",
        price: 24.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesories10.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesories11.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesories12.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesories13.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
    ],
  },
  {
    title: "Arrivals01",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths1.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths2.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths3.png",
        name: "Athletic Leggings",
        description: "Flexible leggings for workouts or casual outings.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths4.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths5.png",
        name: "Slim Fit T-Shirt",
        description: "Comfortable and stylish slim fit T-shirt.",
        price: 24.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths6.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
    ],
  },
  {
    title: "Arrivals02",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth15.png",
        name: "Performance T-Shirt",
        description: "A lightweight, moisture-wicking T-shirt designed for high-intensity workouts.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth14.png",
        name: "Compression Shorts",
        description: "Stretchable shorts offering muscle support and optimal range of motion.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth17.png",
        name: "Training Tank",
        description: "A breathable tank top designed for unrestricted movement during workouts",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth18.png",
        name: "Sleeveless Training Tank",
        description: "A breathable tank top designed for unrestricted movement during workouts",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth20.png",
        name: "Layer Leggings",
        description: "Flexible leggings for layering under shorts or joggers in colder conditions.",
        price: 24.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth21.png",
        name: "Base Layer Leggings",
        description: "Flexible leggings for layering under shorts or joggers in colder conditions.",
        price: 59.99,
      },
    ],
  },
  {
    title: "Carry01",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesorios/women-accesorios7.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesorios/women-accesorios8.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesorios/women-accesorios9.png",
        name: "Athletic Leggings",
        description: "Flexible leggings for workouts or casual outings.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesorios/women-accesorios10.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesorios/women-accesorios11.png",
        name: "Slim Fit T-Shirt",
        description: "Comfortable and stylish slim fit T-shirt.",
        price: 24.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesorios/women-accesorios12.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
    ],
  },
  {
    title: "Carry02",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios1.png",
        name: "Elegant Gym Set",
        description: "A set of versatile gym for strength training and stretching.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios2.png",
        name: "Warm up Gym Set",
        description: "A set of versatile gym for strength for training and stretching.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios3.png",
        name: "Athletic Basic Gym Set",
        description: "A set of versatile gym for strength for training and stretching.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios4.png",
        name: "Gym Set Barbell",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios5.png",
        name: "Luxury Gym Set Barbell",
        description: "Comfortable and stylish slim fit T-shirt.",
        price: 24.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios6.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios7.png",
        name: "Denim Jacket",
        description: "Classic denim jacket for all seasons.",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios8.png",
        name: "Home Gym Set",
        description: "Classic denim ",
        price: 59.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios9.png",
        name: "Denim Gym Set",
        description: "Durable Gym Set to enhance grip during weightlifting.",
        price: 59.99,
      },
    ],
  },
  {
    title: "Accessories02",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/wallet/mens-wallet1.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/wallet/mens-wallet2.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/wallet/mens-wallet3.png",
        name: "Athletic Leggings",
        description: "Flexible leggings for workouts or casual outings.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/wallet/mens-wallet4.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },

    ],
  },
  {
    title: "Basic01",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic1.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic2.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic3.png",
        name: "Athletic Leggings",
        description: "Flexible leggings for workouts or casual outings.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic4.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic5.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic6.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic7.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic8.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic9.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
    ],
  },
  {
    title: "Basic02",
    items: [
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic1.png",
        name: "Elegant Dress",
        description: "Stylish and comfortable dress for special occasions.",
        price: 49.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic2.png",
        name: "Casual Hoodie",
        description: "Cozy hoodie perfect for everyday wear.",
        price: 34.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic3.png",
        name: "Athletic Leggings",
        description: "Flexible leggings for workouts or casual outings.",
        price: 29.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic4.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic5.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic6.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic7.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic8.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
      },
      {
        ImageUrl:
          "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic9.png",
        name: "Men's Sweatshirt",
        description: "Warm sweatshirt ideal for winter.",
        price: 39.99,
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
