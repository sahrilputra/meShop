import styles from './styles.module.scss'
import MainSwipper from './swipper'
import OffersComponent from './offers'
export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <MainSwipper />
      <OffersComponent />
      <div className={styles.user}>users</div>
    </div>
  )
}
