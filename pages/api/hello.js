// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDb, disconnectDb } from "../../utils/db"
export default function handler(req, res) {
  connectDb();
  disconnectDb();
  res.status(200).json({ name: 'John Doe' })
}
