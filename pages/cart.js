
import { CartHeader } from '../components/cart/header/CartHeader'
import { EmptyComponent } from '../components/cart/empty/Empty'
import { CartHead } from '../components/cart/cartHeader'
import { Checkout } from '../components/cart/checkout'
import React from 'react'
import styles from '../styles/cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { ProductCart } from '../components/cart/products'
import { useState } from 'react'
import { useEffect } from 'react'
import { PaymentMethods } from '../components/cart/PaymentMethod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { saveCart } from '../request/user'
export default function Cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  console.log(session);
  const { cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch();
  const items = cart.cartItems;

  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setShippingFee(selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2))
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2))
    setTotal((selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)).toFixed(2))
  }, [selected]);

  const saveCartToDbHandler = async () => {
    const res = saveCart(selected, session.user.id);
    Router.push("/checkout")
    if (session) {

    } else {
      signIn();
    }
  }
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
              <Checkout
                subTotal={subTotal}
                shippingFee={shippingFee}
                total={total}
                selected={selected}
                saveCartToDbHandler={saveCartToDbHandler}
              />
              <PaymentMethods />
            </div>
          ) : (
            <EmptyComponent />
          )
        }
      </div>
    </div>

  )
}

