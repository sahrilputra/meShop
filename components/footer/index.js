import { Copyright } from './Copyright'
import Links from './Link'
import { Payment } from './Payment'
import { Socials } from './Socials'
import styles from './styles.module.scss'

export const Footer = ({country }) => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__container}>
            <Links/>
            <Socials />
            <Payment />
            <Copyright />
        </div>
    </footer>
  )
}
