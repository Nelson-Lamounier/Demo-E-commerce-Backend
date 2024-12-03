import mongoose, { Schema, Document } from "mongoose";

// Input Type (for inserting/updating)
export interface ProductInput {
  _id?: string; // Make `_id` optional
  ImageUrl: string;
  name: string;
  description: string;
  price: number;
}
export interface Category {
  title: string;
  items: ProductInput[];
}
// Mongoose Document (full type)
export interface ProductDocument extends Document {
  title: string;
  items: ProductInput[];
}

// Define the schema for Product items
const ProductSchema = new Schema<ProductInput>({
  ImageUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Define the schema for the category with its items
const CategorySchema = new Schema<ProductDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  items: {
    type: [ProductSchema],
    required: true,
  },
});
const Product = mongoose.model<ProductDocument>("Product", CategorySchema);

export default Product;
