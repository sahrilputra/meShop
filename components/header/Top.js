import styles from './styles.module.scss'
import { CgArrowsExchangeV } from "react-icons/cg";
import { MdSecurity, MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";
import { useState } from 'react';
import { UserMenu } from './UserMenu';
import { useSession } from 'next-auth/react';

export const Top = () => {
    const { data: session } = useSession()
    const [visible, setVisible,] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        <span><CgArrowsExchangeV /> IDR </span>
                    </li>
                    <li className={styles.li}>
                        <span> <MdSecurity /> Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <span>Costumer Services</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <span> <AiOutlineHeart /> Whislist</span>
                    </li>
                    <li className={styles.li}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {session ? (
                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    <img
                                        src={session.user.image}
                                        alt="Avatar" />
                                    <span>{session.user.name}</span>
                                    <RxCaretDown />
                                </div>
                            </li>
                        ) : (
                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    <span>Account</span>
                                    <RxCaretDown />
                                </div>
                            </li>
                        )}
                        {
                            visible && <UserMenu session={session} />
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}
