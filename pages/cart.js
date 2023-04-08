
import { CartHeader } from '../components/cart/header/CartHeader'
import { EmptyComponent } from '../components/cart/empty/Empty'
import { CartHead } from '../components/cart/cartHeader'
import { Checkout } from '../components/cart/checkout'
import React from 'react'
import styles from '../styles/cart.module.scss'
import { useDispatch,useSelector} from 'react-redux'

import { ProductCart } from '../components/cart/products'

export default function Cart ()  {
  
  const {cart} = useSelector((state) => ({...state}))
  const dispatch = useDispatch();
  const items = cart.cartItems;
  
  console.log(items);
  return (
    <div>
      <CartHeader />
      <div className={styles.cart}>
        {
          items.length > 0 ? (
            <div className={styles.cart__container}>
              <CartHead
              cartItems={items}
              className={styles.cart__header}
              />
              <div className={styles.cart__products}>
                {
                  items.map((product) => (
                    
                    <>
                    <ProductCart product={product} key={product._uid}/>
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

