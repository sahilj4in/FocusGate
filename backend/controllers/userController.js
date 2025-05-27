import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const registerUser = async (req,res) => {
    const { name, email, password } = req.body ;
    try {
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({
                message: "User alreasdy esists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name : name, 
            email: email,
            password: hashedPassword
        });

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.status(201).json({user: { 
            id: newUser._id,
            name: newUser.name,
            email: email
        }, token});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const loginUser = async (req,res) => {
    const { email, password } = req.body ;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)  {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.status(200).json({ user: { id: user._id, name: user.name, email: email }, token });

    } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}