import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: true },
  blogs:{type:Array}
});

// Create the User model
export const User = mongoose.model('User', userSchema);
