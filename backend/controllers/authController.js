import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

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
      password:hashedPassword
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
    console.log(req.body);

    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(password, userExist.password);

    if (isValidPassword) {
      res.status(200).json({
        message: "Login Sucessfull",
        user: {
          id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          jwt: await userExist.generateToken()
        },
      });
    }else{
        res.status(401).json({
            message: "Invalid email or password"
        })
    }
  } catch (error) {
    console.log(`Login Error: ${error}`);
  }
};
