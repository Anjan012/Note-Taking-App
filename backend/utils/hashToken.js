import crypto from "crypto";

export const hashToken = (token) => {
    return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

// crypto.createHash("sha256"): This creates a hash object using the sha256 algorithm.

// .update(token): This feeds the input token into the hash object. The input is processed using UTF-8 encoding by default, which is standard for ensuring consistent hashes across different platforms.

// .digest("hex"): This calculates the final hash value and returns it in a hexadecimal (base16) format. The output will always be a fixed 64 characters long, regardless of the input size.