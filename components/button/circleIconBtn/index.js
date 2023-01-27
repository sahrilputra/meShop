import styles from "./styles.module.scss"
import { BiRightArrowAlt } from "react-icons/bi";
export const CircleIconBtn = ({
    type,
    text,
    icon,
}) => {
    return ( 
        <buton className={styles.button} type = {type} >  
        <span>{text}</span>
        <div className={styles.svg__wrap}>
            <BiRightArrowAlt />
        </div>
        </buton>
    )
}