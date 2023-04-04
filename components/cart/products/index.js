/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { BsHeart } from "react-icons/bs";
export const ProductCart = ({ product, selected, setSelected }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const [active, setActive] = useState();
  
  
  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p._uid !== product._uid));
    } else {
      setSelected([...selected, product]);
    }
  };
  return (
    <div>
      <div className={`${styles.card} ${styles.product}`}>
        {product.quantity < 1 && <div className={styles.blur}></div>}
        <div className={styles.product__header}>
          MESHOP
        </div>

        <div className={styles.product__image}>
          <div
            className={`${styles.checkbox} ${active ? styles.active : ""}`}
            onClick={() => handleSelect()}
          ></div>
          <img src={product.images[0].url} alt="" />
          <div className={styles.col}>
            <div className={styles.grid}>
              <h1>
                {product.name.length > 30
                  ? `${product.name.substring(0, 30)}`
                  : product.name}
              </h1>
              <div style={{ zIndex: "2" }}>
                <BsHeart />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
