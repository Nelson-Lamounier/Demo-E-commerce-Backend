/** @format */

import { Request, Response } from "express";
import Image from "../../model/image";

// Controller to handle fetchinh images by category
export const getImagesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;
  console.log(`Fetching images for category ${category}`);
  try {
    // Query the database for images with the specified category
    const filter = category ? { category } : {}; // If no category, fetch all images
    const images = await Image.find(filter);
    console.log(`Found images: ${images.length}`);
    res.status(200).json(images);
  } catch (err) {
    console.error(`Error fectching image: ${(err as Error).message}`);
    res.status(500).json({ error: (err as Error).message });
  }
};

// Controller to handle fetching a single images by ID
export const getImageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      res.status(404).json({ error: "Image not found" });
      return;
    }
    res.send(image);
  } catch (err) {
    console.error(`Error fetching image by ID: ${(err as Error).message}`);
    res.status(500).json({ error: (err as Error).message });
  }
};
