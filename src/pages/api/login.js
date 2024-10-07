import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { connectMongo } from '../../utils/db';
import User from '../../models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await connectMongo(); 

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '10h' }  
      );

      res.setHeader('Set-Cookie', [
        serialize('token', token, {
          maxAge: 36000,               
          path: '/',
          sameSite: 'strict',         
          secure: process.env.NODE_ENV === 'production', 
        }),
        serialize('logged_in', true, {
          httpOnly: false,             
          maxAge: 36000,               
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production', 
        })
      ]);

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
