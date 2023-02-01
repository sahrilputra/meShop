import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: "please enter your full name",

            },
            email: {
                type: String,
                required: "please enter your email address",
                trim: true,
                uniqe: true,
            },
            passowrd: {
                type: String,
                required: "please enter your password"
            },
            role: {
                type: String,
                default: "user",
            },
            image: {
                type: String,
                default: "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
            },
            emailVerified: {
                type: Boolean,
                default: false,
            },
            defaultPaymentMethod: {
                type: String,
                default: ''
            },
            address: [{
                firstName: {
                    type: String,
                },
                lastName: {
                    type: String,
                },
                phoneNumber: {
                    type: String,
                },
                address1: {
                    type: String,
                },
                address2: {
                    type: String,
                },
                city: {
                    type: String,
                },
                zipCode: {
                    type: String,
                },
                state: {
                    type: String,
                },
                country: {
                    type: String,
                },
                activity: {
                    type: Boolean,
                    default: false,
                },
            }]
        },
    {
        timestamps: true,
    }
);

const User = mongoose.model.User || mongoose.model('User', userSchema);

export default User