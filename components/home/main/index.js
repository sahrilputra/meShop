import styles from './styles.module.scss'
import MainSwipper from './swipper'
import OffersComponent from './offers'
import Menu from './menu'
import User from './user'
import Header from './header'
export const Main = () => {
  return (
    <div className={styles.main}>
      <Header/>
      <Menu />
      <MainSwipper />
      <OffersComponent />
      <User />
    </div>
  )
}
