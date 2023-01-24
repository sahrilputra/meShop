import styles from './styles.module.scss'
import { BiUser, BiSend ,BiKey } from "react-icons/bi";

export const LoginInput = ({ icon, placeholder }) => {
    return (
        <div className={styles.input}>
            {icon == "user" ? (
            <BiUser /> 
            ): icon == "email" ? (
            <BiSend />
            ): icon == "password"?(
            <BiKey />
            ): (
                ""
            )}
            <input type="text" placeholder={placeholder}/>
        </div>
    );
}
