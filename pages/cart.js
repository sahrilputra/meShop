
import { CartHeader } from '../components/cart/header/CartHeader'
import { EmptyComponent } from '../components/cart/empty/Empty'
import React from 'react'
import styles from '../styles/Home.module.scss'
const cart = () => {
  const cart = [];
  return (
    <div>
      <CartHeader />
      <div className={styles.cart}>
        {
          cart.length > 0 ? (
            "WELCOME"
          ) : (
            <EmptyComponent />
          )
        }
      </div>
    </div>

  )
}

export default cart