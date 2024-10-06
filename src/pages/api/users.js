import { connectMongo } from '../../utils/db';
import User from '../../models/User';  
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connectMongo();  

  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ name, email, password: hashedPassword });
      const savedUser = await newUser.save();

      res.status(201).json({ message: 'User created', user: savedUser });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
