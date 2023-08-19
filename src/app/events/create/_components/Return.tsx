import { FC } from 'react'
import { Return as ReturnType } from '../_hooks/useEventCreate'
import styles from './Return.module.css'

type Props = {
  returns: ReturnType[]
  onClickFileUpload: (i: number, e: React.ChangeEvent<HTMLInputElement>) => void
  addNewReturn: () => void
  onChangeReturnName: (i: number, name: string) => void
  onChangeReturnAmount: (i: number, amount: number) => void
  onChangeReturnContent: (i: number, content: string) => void
}

export const Return: FC<Props> = ({
  returns,
  onClickFileUpload,
  onChangeReturnAmount,
  onChangeReturnContent,
  onChangeReturnName,
  addNewReturn,
}) => (
  <div className={styles.container}>
    {returns.map((r, i) => (
      <div className={styles.returns} key={i}>
        <div className={styles.image}>
          {r.imageUrl ? (
            <img src={r.imageUrl} alt='event' className={styles.image} key={r.imageUrl} />
          ) : (
            <label htmlFor='new'>
              <img src='/images/camera.svg' alt='camera' className={styles.camera} />
              <input id='new' className={styles.input_file} type='file' onChange={(e) => onClickFileUpload(i, e)} />
            </label>
          )}
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>リターン名</label>
          <input
            type='text'
            value={r.name}
            className={styles.input_text}
            onChange={(e) => onChangeReturnName(i, e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>リターン金額</label>
          <input
            type='number'
            value={r.amount <= 0 ? undefined : r.amount}
            className={styles.input_text}
            onChange={(e) => onChangeReturnAmount(i, Number(e.target.value))}
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>リターン内容</label>
          <textarea
            value={r.content}
            className={styles.textarea}
            onChange={(e) => onChangeReturnContent(i, e.target.value)}
          />
        </div>
      </div>
    ))}

    <button className={styles.button} onClick={() => addNewReturn()}>
      リターンをさらに追加
    </button>
  </div>
)
