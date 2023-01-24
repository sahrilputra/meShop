import styles from '../styles/signin.module.scss';
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { IoArrowBackOutline } from "react-icons/io5";
import Link from 'next/link';
const signin = () => {
  return (
    <>
    {/* <Header /> */}
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__header}>
          <div className={styles.back__svg}>
            <IoArrowBackOutline />
          </div>
          <span>
            <p>Lets join with us ! <Link href="#"> Go Store</Link></p>
          </span>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default signin