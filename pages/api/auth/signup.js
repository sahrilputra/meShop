import nc from "next-connect";
import {validateEmail} from "../../../utils/validation"
import db from "../../../utils/db"
const handler = nc();
handler.post(async(req, res)=>{
    try {
        await db.connectDb();
        const {name, email, password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json({ message: "Pliss fill in all fields."});
        }
        if(!validateEmail(email)){
            return res.status(400).json({ message: "invalid Email."});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
export default handler
