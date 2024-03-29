import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useSession, signIn, signOut } from "next-auth/react"
import { Main } from '../components/home/main'
import Category from '../components/home/category'
import FlashDeals from '../components/home/flashDeals'
import {
  women_dresses,
  women_shoes, women_accessories, 
  women_swiper, gamingSwiper,homeImprovSwiper,
} from '../data/home'
import { useMediaQuery } from "react-responsive";
const inter = Inter({ subsets: ['latin'] })
import ProductsSwiper from "../components/productsSwiper";
import Product from '../models/Product'
import ProductCard from "../components/productCard";

// database
import db from '../utils/db';


export default function Home({ products }) {
 
  const { data: session } = useSession()
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
      <div>
        <Header />
        <div className={styles.home}>
          <div className={styles.container}>
            <Main />
            <FlashDeals />
            <div className={styles.home__category}>
              <Category header="Dres"
                products={women_dresses}
                background="#5a31f4" />
                {
                  !isMedium && 
                  (
                    <Category header="Sepatu"
                    products={women_shoes}
                    background="#f35b69" />
                  )
                }
                 {
                  isMobile && 
                  (
                    <Category header="Sepatu"
                    products={women_shoes}
                    background="#f35b69" />
                  )
                }
              <Category header="Aksesoris"
                products={women_accessories}
                background="#000" />
            </div>

            <ProductsSwiper products={women_swiper}/>
            <ProductsSwiper products={gamingSwiper} header="Untuk Gamer" bg="#2f822f"/>
            <ProductsSwiper products={homeImprovSwiper} header="Perlengkapan Rumah" bg="#2d23ff"/>
            <div className={styles.products}>
              {
                products.map((product)=>(
                  <>
                  <ProductCard  product={product} key={product._id}/>
                  </>
                ))
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps(){
db.connectDb();
let products = await Product.find().sort({createdAt:-1}).lean();
console.log(products);

return{
  props:{
    products: JSON.parse(JSON.stringify(products)),
  }
}
}
