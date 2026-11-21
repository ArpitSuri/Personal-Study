// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../model/userModel.js";
// import { OAuth2Client } from "google-auth-library";
// import { isAdminUser } from "../utils/admin.js";

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const createToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN || "7d"
//     });
// };

// export const signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password)
//             return res.status(400).json({ message: "All fields are required" });

//         const existing = await User.findOne({ email });
//         if (existing)
//             return res.status(400).json({ message: "Email already in use" });

//         const hashed = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name,
//             email,
//             password: hashed
//         });

//         const token = createToken(user._id);

//         return res.status(201).json({
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.avatar,
//                 theme: user.theme
//             }
//         });
//     } catch (err) {
//         console.error("Signup error:", err);
//         return res.status(500).json({ message: "Server error" });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password)
//             return res.status(400).json({ message: "Email and password required" });

//         const user = await User.findOne({ email });
//         if (!user)
//             return res.status(400).json({ message: "Invalid credentials" });

//         if (!user.password)
//             return res.status(400).json({ message: "This account uses Google sign-in" });

//         const match = await bcrypt.compare(password, user.password);
//         if (!match)
//             return res.status(400).json({ message: "Invalid credentials" });

//         const token = createToken(user._id);

//         return res.json({
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.avatar,
//                 theme: user.theme
//             }
//         });
//     } catch (err) {
//         console.error("Login error:", err);
//         return res.status(500).json({ message: "Server error" });
//     }
// };

// export const me = async (req, res) => {
//     return res.json({ user: { ...req.user.toObject(), isAdmin: isAdminUser(req.user) } });
// };


// export const googleLogin = async (req, res) => {
//     try {
//         const { credential } = req.body;
//         if (!credential)
//             return res.status(400).json({ message: "Missing Google credential" });

//         const ticket = await googleClient.verifyIdToken({
//             idToken: credential,
//             audience: process.env.GOOGLE_CLIENT_ID
//         });
//         const payload = ticket.getPayload();

//         if (!payload?.email || !payload.email_verified)
//             return res.status(400).json({ message: "Google email not verified" });

//         const email = payload.email.toLowerCase();

//         let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email }] });

//         if (!user) {
//             user = await User.create({
//                 name: payload.name || email.split("@")[0],
//                 email,
//                 googleId: payload.sub,
//                 avatar: payload.picture || ""
//             });
//         } else if (!user.googleId) {
//             // existing email/password account: link it to this Google identity
//             user.googleId = payload.sub;
//             if (!user.avatar && payload.picture) user.avatar = payload.picture;
//             await user.save();
//         }

//         const token = createToken(user._id);

//         return res.json({
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.avatar,
//                 theme: user.theme
//             }
//         });
//     } catch (err) {
//         console.error("Google login error:", err);
//         return res.status(401).json({ message: "Google authentication failed" });
//     }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { OAuth2Client } from "google-auth-library";
import { isAdminUser } from "../utils/admin.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Email already in use" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        const token = createToken(user._id);

        return res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                theme: user.theme,
                isAdmin: isAdminUser(user)
            }
        });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        if (!user.password)
            return res.status(400).json({ message: "This account uses Google sign-in" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });

        if (user.isBlocked)
            return res.status(403).json({ message: "Your account has been suspended" });

        const token = createToken(user._id);

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                theme: user.theme,
                isAdmin: isAdminUser(user)
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const me = async (req, res) => {
    return res.json({ user: { ...req.user.toObject(), isAdmin: isAdminUser(req.user) } });
};

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential)
            return res.status(400).json({ message: "Missing Google credential" });

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        if (!payload?.email || !payload.email_verified)
            return res.status(400).json({ message: "Google email not verified" });

        const email = payload.email.toLowerCase();

        let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email }] });

        if (user?.isBlocked)
            return res.status(403).json({ message: "Your account has been suspended" });

        if (!user) {
            user = await User.create({
                name: payload.name || email.split("@")[0],
                email,
                googleId: payload.sub,
                avatar: payload.picture || ""
            });
        } else if (!user.googleId) {
            // existing email/password account: link it to this Google identity
            user.googleId = payload.sub;
            if (!user.avatar && payload.picture) user.avatar = payload.picture;
            await user.save();
        }

        const token = createToken(user._id);

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                theme: user.theme,
                isAdmin: isAdminUser(user)
            }
        });
    } catch (err) {
        console.error("Google login error:", err);
        return res.status(401).json({ message: "Google authentication failed" });
    }
};