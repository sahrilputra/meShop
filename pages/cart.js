
import { CartHeader } from '../components/cart/header/CartHeader'
import { EmptyComponent } from '../components/cart/empty/Empty'
import React from 'react'
import styles from '../styles/Home.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCart } from '../components/cart/products'
export default function Cart ()  {
  const {cart} = useSelector((state) => ({...state}))
  const dispatch = useDispatch();
  return (
    <div>
      <CartHeader />
      <div className={styles.cart}>
        {
          cart.length < 1 ? (
            <div className={styles.cart__container}>
              <div className={styles.cart__products}>
                {
                  cart.cartItems.map((product) => (
                    <>
                    <ProductCart product={product} key={product._uid}/>
                    </>
                  ))
                }
              </div>
            </div>
          ) : (
            <EmptyComponent />
          )
        }
      </div>
    </div>

  )
}

