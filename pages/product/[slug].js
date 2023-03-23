import styles from '../../styles/product.module.scss'
import db from '../../utils/db'
import Product from '../../models/Product'
import Category from '../../models/Category'
import SubCategory from '../../models/SubCategory'
import Head from 'next/head';
import { Header } from '../../components/header'
import MainSwiper from '../../components/ProductPage/mainSwipper'
import { useState } from 'react'
import Infos from '../../components/ProductPage/info'
export default function product({ product }) {

    const [activeImg, setActiveImg] = useState("");

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <Header />
            <div className={styles.product}>
                <div className={styles.container}>
                    <div className={styles.path}>
                        Home / {product.category.name}
                        {
                            product.subCategories.map((sub) => (
                                <>
                                    <span>/{sub.name}</span>
                                </>
                            ))
                        }
                    </div>

                    <div className={styles.product__main}>
                        <MainSwiper images={product.images} activeImg={activeImg} />
                        <Infos product={product} /> 
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    const { query } = context;
    const slug = query.slug;
    const style = query.style;
    const size = query.size || 0;
    db.connectDb();
    //============================
    let product = await Product.findOne({ slug })
        .populate({ path: "category", model: Category })
        .populate({ path: "subCategories._id", model: SubCategory })
        .lean();
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes.map((s) => {
        return s.price;
    }).sort((a, b) => {
        return a - b;
    });

    let newProduct = {
        ...product,
        images: subProduct.images,
        sizes: subProduct.sizes,
        discount: subProduct.discount,
        sku: subProduct.sku,
        colors: product.subProducts.map((p) => {
            return p.color;
        }),
        priceRange: prices.length > 1 ?
            `From ${prices[0]}$ to ${prices[prices.length - 1]}$`
            : "",
        price: subProduct.discount > 0
            ? (subProduct.sizes[size].price -
                (subProduct.sizes[size].price / subProduct.discount)
            ).toFixed(2)
            : subProduct.sizes[size].price,
        priceBefore: subProduct.sizes[size].price,
        quantity: subProduct.sizes[size].qty,
    }

    //============================
    db.disconnectDb();
    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    }
}