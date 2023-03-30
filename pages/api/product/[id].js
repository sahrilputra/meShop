import nc from 'next-connect'
import db from '../../../utils/db'
const handler = nc();

handler.get(async (req, res) => {
    try {
        db.connectDb();
        const id = req.query.id;
        const style = req.query.style;
        const size = req.query.size;
        console.log(id, style, size);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export default handler;