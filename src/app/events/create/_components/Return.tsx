import { FC } from 'react'
import { Return as ReturnType } from '../_hooks/useEventCreate'
import styles from './Return.module.css'

type Props = {
  returns: ReturnType[]
  onClickFileUpload: (i: number, e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Return: FC<Props> = ({ returns, onClickFileUpload }) => (
  <div className={styles.container}>
    {returns.map((r, i) => (
      <div key={i}>
        <div className={styles.image}>
          {r.imageUrl ? (
            <img src={r.imageUrl} alt='event' className={styles.image} key={r.imageUrl} />
          ) : (
            <label htmlFor='new'>
              <img src='/images/camera.svg' alt='camera' className={styles.camera} />
              <input id='new' className={styles.input} type='file' onChange={(e) => onClickFileUpload(i, e)} />
            </label>
          )}
        </div>

        <div>
          <label className={styles.input_label}>リターン名</label>
          <input type='text' value={r.name} className='input_text' />
        </div>

        <div>
          <label className={styles.input_label}>リターン金額</label>
          <input type='number' value={r.amount} className='input_text' />
        </div>

        <div>
          <label className={styles.input_label}>リターン内容</label>
          <textarea value={r.content} className='text_area' />
        </div>
      </div>
    ))}
  </div>
)
