import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // This means the session belongs to a specific user
            ref: "User", // Sessions are independent lifeCycle objects You may delete sessions without touching user
            required: true
        },
        token : {
            // this is not the raw token but a hashed version of it
            type: String,
            required: true,
            unique: true // prevents dublication
        },
        expiresAt: {
            type: Date,
            required: true
        },
        // why not delete? for audit purposes
        revoked: {
            type: Boolean,
            default: false,
        },
        
    },
    {
        // professional always enable this: to handle createdAt and updatedAt fields allows session history tracking
        timestamps: true,
    }
);

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);