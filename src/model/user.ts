import mongoose, {Schema, Document} from "mongoose";

// Define the interface for TypeScript
interface User extends Document {
    username: string;
    email: string;
    googleId: string;
    password: string;
    receiveEmails: boolean;
}

// Create the schema for Mongoose
const UserSchema: Schema = new Schema<User>({
    username:{
        type:String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: { type: String },
    password: {
        type: String,
        required: false,
    },
    receiveEmails: {
        type: Boolean,
        default: false, // Default value
    }        
})

// Export the Mongoose model

const User = mongoose.model<User>('User', UserSchema);

export default User;