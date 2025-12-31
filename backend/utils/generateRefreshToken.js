import crypto from "crypto";

export const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex"); 
}


// crypto.randomBytes(64): This function generates 64 bytes (512 bits) of cryptographically strong pseudo-random data. It returns a Buffer object.

// .toString("hex"): This method converts the buffer into a string using hexadecimal encoding. In this encoding, every single byte from the buffer is represented as two characters in the resulting string.

// Resulting length: 64 bytes * 2 hex characters/byte = 128 characters. 