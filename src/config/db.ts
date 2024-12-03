import mongoose from 'mongoose'

/**
 * Connect to MongoDb
 * @return {Promise<void>}
 */

const connectDB = async (): Promise<void> =>{
    try{
        const mongoURI = process.env.MONGO_URI;
        
        if(!mongoURI) {
            throw new Error('MONGO_URI is not defined in the environment varibales.')
        }

        await mongoose.connect(mongoURI)
        console.log('MongoDB Connected')
    } catch (err: unknown) {

        if (err instanceof Error) {
            console.log(`Error connceting to MongoDB: ${err.message}`)
        } else {
            console.error("Unknown error occurred while connecting to MongoDB")
        }
    }
}

export default connectDB 