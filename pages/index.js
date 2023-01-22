import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import  { Header }  from '../components/header'
import { Footer } from '../components/footer'
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
    <div>
      <Header/>
      {
        session ? "Login " : "Not Login"
      }
      <Footer/>
    </div>
    </>
  )
}
