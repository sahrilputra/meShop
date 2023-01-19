import styles from './styles.module.scss'
import Link from 'next/link'
export const UserMenu = ({ loggin }) => {
    return (
        <div className={styles.menu}>
            <h4>Welcome User</h4>
            {loggin ? (
                <div className={styles.flex}>
                    <img
                        src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
                        alt="Avatar" 
                        className={styles.menu__img}
                        />
                        <div className={styles.col}>
                            <span>Welcome Back,</span>
                            <h3>Sahril</h3>
                            <span>Sign out</span>
                        </div>
                </div>

                ) : ( 
                    <div className={styles.flex}>
                        <button className={styles.btn_primary}>Register</button>
                        <button className={styles.btn_outlined}>Login</button>
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
