import mongoose, {Schema, Document, } from "mongoose";


// Mongoose Document (full type)
export interface Image extends Document {
    _id: string;
    url: string;
    title: string;
    description: string;
    category: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

// Input Type (for inserting/updating)
export interface ImageInput {
    url: string;
    title: string;
    description: string;
    category: string;
    price: number;
}

const ImageSchema: Schema = new Schema({
    url:{type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true},
    category: {type: String, required: true}, 
    price: {type: Number, required: true},  
})

export default mongoose.model<Image>('Image', ImageSchema)

