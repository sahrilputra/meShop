import { useField } from 'formik';
import styles from './styles.module.scss'
import { BiUser, BiSend ,BiKey } from "react-icons/bi";

export const LoginInput = ({ icon, placeholder, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div className={`${styles.input} ${meta.touched && meta.error ? styles.error : ""} `}>
            {icon == "user" ? (
            <BiUser /> 
            ): icon == "email" ? (
            <BiSend />
            ): icon == "password"?(
            <BiKey />
            ): (
                ""
            )}
            <input 
            type={field.type} 
            name={field.name} 
            placeholder={placeholder}
            {...field}
            {...props}
            />
        </div>
    );
}
