import express from "express"
import Image from "../model/image"

const router = express.Router();

router.get("/images", async( req, res) => {
    try{
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch images'})
    }
})

export default router;