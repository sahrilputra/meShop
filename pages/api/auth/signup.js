import nc from "next-connect";
import { validateEmail } from "../../../utils/validation"
import { createActivationToken } from "../../../utils/tokens"
import db from "../../../utils/db"
import User from "../../../models/Users"
import bcrypt from "bcrypt";
import { sendEmail } from "../../../utils/sendEmails";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";

const handler = nc();
handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const {
            name,
            email,
            password
        } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Pliss fill in all fields."
            });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "invalid Email."
            });
        }

        const user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                message: "This Email already taken."
            });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({
                    message: "Password must be atleast 6 characters."
                });
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: cryptedPassword
        });
        const addedUser = await newUser.save();

        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        });
        const url = `${process.env.BASE_URL}/activate/${activation_token}`;
        sendEmail(email, url, "", "Activate your account", activateEmailTemplate);
        await db.disconnectDb();
        res.json({ message: 'Check out your email, we has been sent to you, use it to reset your password' })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
export default handler
