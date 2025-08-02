import Post from '../models/Post.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Helper to get userId from JWT
function getUserIdFromRequest(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.userId;
    } catch {
        return null;
    }
}

export const createPost = async (req, res) => {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });
    const post = await Post.create({ content: req.body.content, author: userId });
    res.json({ post });
};

export const getPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'fullName email');
    res.json({ posts });
};

export default {
    createPost,
    getPosts
};