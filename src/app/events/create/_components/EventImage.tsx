import { ChangeEvent, FC } from 'react'
import styles from './eventImage.module.css'

type Props = {
  imageUrls: string[]
  onClickFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const EventImage: FC<Props> = ({ imageUrls, onClickFileUpload }) => (
  <div className={styles.images}>
    {imageUrls.map((imageUrl) => (
      <img src={imageUrl} alt='event' className={styles.image} key={imageUrl} />
    ))}
    {imageUrls.length <= 5 && (
      <div className={styles.image}>
        <label htmlFor='new'>
          <img src='/images/camera.svg' alt='camera' className={styles.camera} />
          <input id='new' className={styles.input} type='file' onChange={(e) => onClickFileUpload(e)} />
        </label>
      </div>
    )}
  </div>
)
