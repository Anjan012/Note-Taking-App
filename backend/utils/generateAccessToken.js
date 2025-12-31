import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    jwt.sign(
        {
            userId
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        }
    )
}