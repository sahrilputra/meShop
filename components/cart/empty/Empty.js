import React from 'react'
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react";
import styles from './styles.module.scss'

export const EmptyComponent = () => {
    const { data: session } = useSession();
    return (
        <div className={styles.empty}>
            {/* <img src="../../../" alt="" /> */}
            <h1>Cart is empty</h1>
            {!session && (
                <button onClick={() => signIn()} className={styles.empty__btn}>
                    SIGN IN / REGISTER
                </button>
            )}
            <Link href="/browse">
                <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
                    SHOP NOW
                </button>

            </Link>
        </div>
    );
}
