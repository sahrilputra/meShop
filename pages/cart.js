
import { CartHeader } from '../components/cart/header/CartHeader'
import { EmptyComponent } from '../components/cart/empty/Empty'
import { CartHead } from '../components/cart/cartHeader'
import { Checkout } from '../components/cart/checkout'
import React from 'react'
import styles from '../styles/cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { ProductCart } from '../components/cart/products'
import { useState } from 'react'

export default function Cart() {
  const [selected, setSelected] = useState([]);

  const { cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch();
  const items = cart.cartItems;

  console.log(selected);
  return (
    <div>
      <CartHeader />
      <div className={styles.cart}>
        {
          items.length > 0 ? (
            <div className={styles.cart__container}>
              <CartHead
                cartItems={items}
                selected={selected}
                setSelected={setSelected}
              />
              <div className={styles.cart__products}>
                {
                  items.map((product) => (

                    <>
                      <ProductCart
                        product={product}
                        key={product._uid}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </>
                  ))
                }
              </div>
              <Checkout subTotal={"512"}
                shippingFee={""}
                total={"2111"}
                selected={[]}
              />
            </div>
          ) : (
            <EmptyComponent />
          )
        }
      </div>
    </div>

  )
}

