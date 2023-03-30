import styles from '../../styles/product.module.scss'
import db from '../../utils/db'
import Product from '../../models/Product'
import Category from '../../models/Category'
import SubCategory from '../../models/SubCategory'
import Users from '../../models/Users'
import Head from 'next/head';
import {
    Header
} from '../../components/header'
import MainSwiper from '../../components/ProductPage/mainSwipper'
import {
    useState
} from 'react'
import {
    Infos
} from '../../components/ProductPage/info'
import { ReviewControl } from '../../components/ProductPage/reviews/reviewControl'
export default function product({
    product
}) {

    const [activeImg, setActiveImg] = useState("");

    return (
        <>
            <Head >
                <title >
                    {
                        product.name
                    }
                </title>
            </Head>
            <Header />
            <div className={styles.product} >
                < div className={
                    styles.container
                } >
                    <div className={
                        styles.path
                    } >
                        Home / {
                            product.category.name
                        } {
                            product.subCategories.map((sub) => (
                                <>
                                    <span > /{sub.name}</span >
                                </>
                            ))
                        } </div>

                    <div className={styles.product__main} >
                        < MainSwiper images={
                            product.images
                        }
                            activeImg={
                                activeImg
                            } />

                        <Infos product={product} setActiveImg={setActiveImg} />
                        <div >
                        </div>

                    </div>

                    <ReviewControl product={product} />
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    const {
        query
    } = context;
    const slug = query.slug;
    const style = query.style;
    const size = query.size || 0;
    db.connectDb();
    //============================
    let product = await Product.findOne({
        slug
    })
        .populate({
            path: "category",
            model: Category
        })
        .populate({
            path: "subCategories._id",
            model: SubCategory
        }).populate({
            path: "reviews.reviewBy",
            model: Users
        })
        .lean();
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes.map((s) => {
        return s.price;
    }).sort((a, b) => {
        return a - b;
    });

    let newProduct = {
        ...product,
        style,
        
        images: subProduct.images,
        sizes: subProduct.sizes,
        discount: subProduct.discount,
        sku: subProduct.sku,
        colors: product.subProducts.map((p) => {
            return p.color;
        }),
        priceRange: subProduct.discount ?
            `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to
            ${(prices[prices.length - 1] -
                prices[prices.length - 1] / subProduct.discount).toFixed(2)
            }$` :
            `From ${prices[0]}$ to ${prices[prices.length - 1]}$`,
        price: subProduct.discount > 0 ?
            (subProduct.sizes[size].price -
                (subProduct.sizes[size].price / subProduct.discount)
            ).toFixed(2) :
            subProduct.sizes[size].price,
        priceBefore: subProduct.sizes[size].price,
        quantity: subProduct.sizes[size].qty,
        ratings: [
            {
                percentage: 72,
            },
            {
                percentage: 42,
            },
            {
                percentage: 21,
            },
            {
                percentage: 19,
            },
            {
                percentage: 2,
            },
        ],
        allSizes: product.subProducts
            .map((p) => {
                return p.sizes;
            }).flat()
            .sort((a, b) => {
                return a.size - b.size;
            }).filter(
                (element, index, array) => 
                array.findIndex((el2) => el2.size === element.size) === index
            ),
    }

    //============================
    db.disconnectDb();
    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    }
}