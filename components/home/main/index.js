import styles from './styles.module.scss'
import MainSwipper from './swipper'
import OffersComponent from './offers'
import Menu from './menu'
export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <Menu />
      <MainSwipper />
      <OffersComponent />
      <div className={styles.user}>users</div>
    </div>
  )
}
