import nc from "next-connect";
import { validateEmail } from "../../../utils/validation"
import { createActivationToken, createResetToken } from "../../../utils/tokens"
import db from "../../../utils/db"
import User from "../../../models/Users"
import bcrypt from "bcrypt";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";

const handler = nc();
handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { email } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "Email Doesnt Exist"})
        }

        const user_id = createResetToken({
            id: user._id.toString(),
        })
        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
        sendEmail(email, url, "", "Reset Password Request", resetEmailTemplate);
        await db.disconnectDb();
        res.json({ message: 'Register Succes! Please Activate email to start' })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
export default handler
