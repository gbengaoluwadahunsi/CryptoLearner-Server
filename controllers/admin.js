// authController.js
import Admin from '../models/admin.js'; // Adjust the path as needed


export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();

    console.log(admin);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




export const admin = async(req, res) => {
  
  const {email} =  req.body
  try {
    const { email } = req.body;

    // Check if the user is an admin
    const isAdmin = await Admin.findOne({ email });

    if (isAdmin) {
      res.status(200).json({ isAdmin: true });
    } else {
      res.status(200).json({ isAdmin: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  

}





