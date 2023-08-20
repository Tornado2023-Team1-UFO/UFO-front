import { GoShare } from 'react-icons/go'
import styles from './webShareButton.module.css'
import { webShareData } from './webShareData'

export default function WebShareButton(data: webShareData) {
  async function share() {
    if (!navigator.canShare) {
      alert('ご利用のブラウザでは共有できません。')
      return
    }
    try {
      await window.navigator.share(data)
      alert('共有が完了しました。')
    } catch (e: any) {
      console.log(e.message)
    }
  }
  return (
    <>
      <div className={styles.icon}>
        <GoShare className={styles.goShare} onClick={share} />
      </div>
    </>
  )
}
