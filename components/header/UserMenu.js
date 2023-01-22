import styles from './styles.module.scss'
import Link from 'next/link'
import { signOut, signIn } from 'next-auth/react'
export const UserMenu = ({ session }) => {
    return (
        <div className={styles.menu}>
            <h4>Welcome User</h4>
            {session ? (
                <div className={styles.flex}>
                    <img
                        src={session.user.image}
                        alt="Avatar" 
                        className={styles.menu__img}
                        />
                        <div className={styles.col}>
                            <span>Welcome Back,</span>
                            <h3>{session.user.name}</h3>
                            <span onClick={()=> signOut()}>Sign out</span>
                        </div>
                </div>

                ) : ( 
                    <div className={styles.flex}>
                        <button className={styles.btn_primary}>Register</button>
                        <button className={styles.btn_outlined} onClick={()=> signIn()}>Login</button>
                    </div>
                ) }

                <ul>
                    <li>
                        <Link href="/profile">Account</Link>
                    </li>
                    <li>
                        <Link href="/profile/order">My Order</Link>
                    </li>
                    <li>
                        <Link href="/profile/messagges">Messagge Center</Link>
                    </li>
                    <li>
                        <Link href="/profile/address">Address</Link>
                    </li>
                    <li>
                        <Link href="/profile/whislist">My Whislist</Link>
                    </li>
                    <li>
                        <Link href="#"></Link>
                    </li>
                </ul>
        </div>

    )
}
