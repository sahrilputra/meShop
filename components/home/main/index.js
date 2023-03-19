import styles from './styles.module.scss'
import MainSwipper from './swipper'
export const Main = () => {
  return (
    <div className={styles.main}>
        <div className={styles.header}>header</div>
        <div className={styles.menu}>menu</div>
        <MainSwipper />
        <div className={styles.offers}>offers</div>
        <div className={styles.user}>users</div>
    </div>
  )
}
