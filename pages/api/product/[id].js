import nc from 'next-connect'
import db from '../../../utils/db'
import Product from '../../../models/Product';
const handler = nc();

handler.get(async (req, res) => {
    try {
        db.connectDb();
        const id = req.query.id;
        const style = req.query.style;
        const size = req.query.size;
        const product = await Product.findById(id).lean();
        const discount = product.subProducts[style].discount;
        const priceBefore = product.subProducts[style].sizes[size].price;
        const price = discount ? priceBefore - priceBefore / discount : priceBefore;
        db.disconnectDb();
        return res.json({
            _id: product._id,
            style : Number(style),
            name: product.name,
            description : product.description,
            slug: product.slug,
            sku: product.subProducts[style].sku,
            brand: product.brand,
            shipping: product.brand,
            images: product.subProducts[style].images,
            color: product.subProducts[style].color,
            price,
            priceBefore,
            quantity: product.subProducts[style].sizes[size].qty,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export default handler;