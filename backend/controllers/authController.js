import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { RefreshToken } from "../models/refreshToken.model.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { hashToken } from "../utils/hashtoken.js";

export const home = (req, res) => {
  try {
    res.status(200).send("Welcome to the home page");
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
};

export const register = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists with this email", // This is good for practice but Error message should not leak info
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user to the database
    const userCreated = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registration sucessful",
      user: {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
      },
    });
  } catch (error) {
    console.log(`Registration Error: ${error}`);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    const hashedRefreshToken = hashToken(refreshToken);

    await RefreshToken.create({
      user: user._id,
      token: hashedRefreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      ),
    });

    // res.cookie(name, value [, options])
    res.cookie("accesstoken", accessToken, {
      httpOnly: true, // the cookie won't appear in document.cookie and can't be read or manipulated by JavaScript prevents XSS
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
