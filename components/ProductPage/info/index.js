/* eslint-disable @next/next/no-img-element */
import { Rating } from '@mui/material'
import { ShareControl } from './share/shareControl'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TbMinus, TbPlus } from 'react-icons/tb'
import { BsHeart, BsHandbagFill } from 'react-icons/bs'
import Accordian from './Accordian'
import SimillarSwiper from './SimilliarSwipper'
import { addToCart, updateCart } from '../../../store/cartSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
export const Infos = ({ product, setActiveImg }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [size, setSize] = useState(router.query.size);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    
    const { cart } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        setSize("");
        setQty(1);
    }, [router.query.style]);

    useEffect(() => {
        if (qty > product.quantity) {
            setQty(product.quantity);
        }
    }, [product.quantity, qty, router.query.size]);


    const addToCartHandler = async () => {

        if (!router.query.size) {
            setError('Pilih Ukuran terlebih dahulu');
            return;
        }
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
        )

        if (qty > data.quantity) {
            setError("Product yang dipilih melebihi stock, kurangi beberapa item terlebih dahulu");
        } else if (data.quantity < 1) {
            setError("Procut ini kehabisan stock");
            return;
        } else {
            let _uid = `${data._id}_${product.style}_${router.query.size}`;
            console.log(_uid);
            let exist = cart.cartItems.find((p) => p._uid === _uid);
            if (exist) {
                let newCart = cart.cartItems.map((p) => {
                    if (p._uid == exist._uid) {
                        return { ...p, qty: qty };
                    }
                    return p;
                });
                dispatch(updateCart(newCart));
            } else {
                dispatch(addToCart(
                    {
                        ...data,
                        qty,
                        size: data.sizes,
                        _uid,
                    }
                ))
            }
        }
    }


    return (
        <>
            <div className={styles.infos}>
                <div className={styles.infos__container}>
                    <h1 className={styles.infos__name}>{product.name}</h1>
                    <h2 className={styles.infos__sku}>{product.sku}</h2>
                    <div className={styles.infos__rating}>
                        <Rating
                            name="half-rating"
                            defaultValue={product.rating}
                            precision={0.5}
                            readOnly
                            style={{ color: "FACF19" }}
                        />
                        {product.numReviews}
                        {
                            product.numReviews == 1 ? "review" : "reviews"
                        }
                    </div>
                    <div className={styles.infos__price}>
                        {
                            !size ? (
                                <h2>{product.priceRange}</h2>
                            ) : (
                                <h1>{product.price}</h1>
                            )
                        }
                        {
                            product.discount > 0 ? (
                                <h3>
                                    {
                                        size && <span>{product.priceBefore}</span>
                                    }
                                    <span>(-{product.discount}%)</span>
                                </h3>
                            ) : (
                                ""
                            )
                        }
                    </div>

                    <span className={styles.infos__shipping}>
                        {
                            product.shipping
                                ? `+${product.shipping} $ Shipping fee`
                                : "Free Shipping "
                        }
                    </span>
                    <span>
                        {
                            size
                                ? product.quantity
                                : product.sizes.reduce((start, next) => start + next.qty, 0)
                        }{" "}
                        pieces availabe
                    </span>

                    <div className={styles.infos__sizes_wrap}>
                        {
                            product.sizes.map((size, i) => (
                                <Link
                                    key={size}
                                    href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
                                >

                                    <div className={`${styles.infos__sizes_size} ${i == router.query.size && styles.active_size
                                        }`}
                                        onClick={() => setSize(size.size)}
                                    >
                                        {size.size}
                                    </div>

                                </Link>
                            ))
                        }
                    </div>

                    <div className={styles.infos__colors}>
                        {
                            product.colors && product.colors.map((color, i) => (
                                <>
                                    <span
                                        className={`${i == router.query.style ? styles.actice_color : ""}`}
                                        onMouseOver={() =>
                                            setActiveImg(product.subProducts[i].images[0].url)}
                                        onMouseLeave={() => setActiveImg("")}
                                    >
                                        <Link href={`/product/${product.slug}?style=${i}`}>
                                            <img src={color.image} alt="" />
                                        </Link>
                                    </span>
                                </>
                            ))
                        }
                    </div>

                    <div className={styles.infos__qty}>
                        <button>
                            <TbMinus
                                onClick={() => qty > 1 && setQty((prev) => prev - 1)} />
                        </button>
                        <span>
                            {qty}
                        </span>
                        <button>
                            <TbPlus onClick={() => qty < product.quantity && setQty((prev) => prev + 1)} />
                        </button>
                    </div>

                    <Accordian details={[product.description, ...product.details]} />
                    <div className={styles.infos__actions}>
                        <button
                            disabled={product.quantity < 1}
                            style={{ curson: `${product.quantity < 1 ? "Tidak-dapat diproses" : ""}` }}
                            onClick={() => addToCartHandler()}
                        >
                            <BsHandbagFill />
                            <b>ADD TO CART</b>
                        </button>
                        <button>
                            <BsHeart />
                            WISHLIST
                        </button>
                    </div>
                    {
                        error && <span className={styles.error} style={{ color: "red" }}>{error}</span>
                    }

                    <ShareControl />
                    <SimillarSwiper />
                </div>
            </div>
        </>
    )
}
