import mongoose from 'mongoose';


// Define the user schema
const userSchema = mongoose.Schema({
  
  email: { type: String, required: true, unique: true },
 
});




const Admin = mongoose.model('Admin', userSchema);
export default Admin;
