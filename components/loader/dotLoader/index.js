import styles from './styles.module.scss';
import { RingLoader } from 'react-spinners';

export const LoaderSpinner = ({ loading }) => {
    return (
        <div className={styles.loader}>
            <RingLoader loading={loading} color='#2d2d2d' />
        </div>
    )
}
