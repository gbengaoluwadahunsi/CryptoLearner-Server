// authController.js
import User from '../models/userModel.js'; // Adjust the path as needed
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import Admin from '../models/admin.js';



dotenv.config();


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if a user with the given email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      // If a user with the same email or username is found, send a 400 response
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: error.message });
  }
};


export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
     //check if the user is an admin
     const isAdmin = await Admin.findOne({email})

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, isAdmin:Boolean(isAdmin) });

   

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async(req, res) => {
  const {email} = req.body
  try{
    const user =  await User.findOne({email});
    if(!user){
      return res.status(404).json({error: 'User not Registered'})
    }

    // nodemailer for sending reset password
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '5m'})
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
    
    
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      text: `https://crypto-learner.vercel.app/reset-password/${token}`,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.status.json({message: "error sending email"})
      } else {
        return res.status(200).json({message: "Email sent successfully"})
      }
    });


  }catch(error){
    res.status(500).json({error: error.message})
  }
}

export const resetPassword = async(req, res) => {
  const {token} = req.params
  const {password} =  req.body
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashPassword });
    return res.status(200).json({ status: true, message: "Password updated" });
  } catch (err) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
  

}





