import { Request, Response } from "express";
import Product from "../../model/product";

// Controller to handle fetchinh images by category
export const getProductByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {category} = req.query // Extract the category from the query string
  console.log(`Fetching images for category ${category}`);
  try {
    if(!category) {
      // If no category is specified, fetch all category and their items
      const allCategories = await Product.find();
      console.log(`Found ${allCategories.length} categories`)
      res.status(200).json(allCategories)
    } else {
      // Fetch only the specified category
      const categoryData = await Product.findOne({category});
      if(!categoryData) {
        res.status(404).json({ error: `Category '${category}' not found` });
        return;
      }
      console.log(`Found ${categoryData.items.length} items in category '${category}'`)
      res.status(200).json(categoryData.items)
    } 
  } catch (err) {
    console.error(`Error fectching products: ${(err as Error).message}`);
    res.status(500).json({ error: (err as Error).message });
  }
};

// Controller to handle fetching a single images by ID
export const getImageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  console.log(`Fetching product with ID: ${id}`)
  try {
     // Search across all categories for the image
    const categoryData = await Product.findOne({"items._id": id});
    if (!categoryData) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const product = categoryData.items.find((item) => item._id && item._id.toString() === id)
    if(!product) {
      res.status(404).json({error: "Product not found"})
      return;
    }
    console.log(`Found product: ${product.name}`)
    res.status(200).json(product)
  } catch (err) {
    console.error(`Error fetching image by ID: ${(err as Error).message}`);
    res.status(500).json({ error: (err as Error).message });
  }
};
