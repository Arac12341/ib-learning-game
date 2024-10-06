import { connectMongo } from '../../utils/db';
import User from '../../models/User';

export default async function handler(req, res) {
  await connectMongo();  // Connect to MongoDB

  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;
    console.log('Received signup request:', { firstName, lastName, email });

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = new User({
        name: `${firstName} ${lastName}`,
        email,
        password,  
      });

      await newUser.save();
      console.log('User created successfully');
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
