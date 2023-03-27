import styles from './styles.module.scss';
import { FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FacebookIcon } from 'react-share';
export const ShareControl = () => {
  return (
    <div className={styles.share}>
      <FacebookShareButton url={""}>
        <FacebookIcon size={36} />
      </FacebookShareButton>
      <TwitterShareButton url={""}>
      <TwitterIcon size={36} />
      </TwitterShareButton>
      <WhatsappShareButton url={""}>
      <WhatsappIcon size={36} />
      </WhatsappShareButton>
      <TelegramShareButton url={""}>
      <TelegramIcon size={36} />
      </TelegramShareButton>
    </div>
  )
}
