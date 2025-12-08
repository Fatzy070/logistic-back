import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const SignUp = async (req , res ) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email  || !password ) {
            return res.status(400).json({ message: 'Please provide name, email and password' });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign(
            { userId: newUser._id , email: newUser.email , name: newUser.name , role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: 'User created successfully',
            user: { 
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            token
        })

    } catch (error) {
        console.error('Error during user sign up:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const Login = async (req , res) => {
    try {
        const { email, password } = req.body;   
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign(
            { userId: user._id , email: user.email , name: user.name , role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getProfile = async (req , res ) => {
    try {
       const userId = req.user.userId;

         const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteUser = async ( req , res ) => {
    try {
        const userId = req.params.id ;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getAllUsers = async (req , res) => {
    try {
        const users = await User.find().select('-password')

        res.status(200).json({ users });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
}