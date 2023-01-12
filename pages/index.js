import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import  { Header }  from '../components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div>
      <Header/>
    </div>
    </>
  )
}
