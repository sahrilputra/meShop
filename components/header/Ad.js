import Link from 'next/link';
import styles from './styles.module.scss';

export const Ad = () => {
  return (
    <Link href='/browse'>
        <div className={styles.ad}></div>
    </Link>
  )
}
