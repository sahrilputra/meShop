import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import  { Header }  from '../components/header'
import { Footer } from '../components/footer'
import { useSession, signIn, signOut } from "next-auth/react"
import { Main } from '../components/home/main'
import FlashDeals from '../components/home/flashDeals'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
    <div>
      <Header/>
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
        </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}
