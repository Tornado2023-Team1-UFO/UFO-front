import { FC } from 'react'
import { Return as ReturnType } from '../_hooks/useEventCreate'
import styles from './return.module.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'

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
        <div className={styles.flex}>
          <div className={styles.input_text_container}>
            <div className={styles.input_container}>
              <input
                type='text'
                value={r.name}
                className={styles.input_text}
                onChange={(e) => onChangeReturnName(i, e.target.value)}
                placeholder='リターン名を入力'
              />
            </div>
            <div className={styles.input_container}>
              <input
                type='number'
                value={r.amount <= 0 ? undefined : r.amount}
                className={styles.input_text}
                onChange={(e) => onChangeReturnAmount(i, Number(e.target.value))}
                placeholder='リターン金額を入力'
              />
            </div>
          </div>
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
        </div>

        <div className={styles.input_container}>
          <textarea
            value={r.content}
            className={styles.textarea}
            onChange={(e) => onChangeReturnContent(i, e.target.value)}
            placeholder='リターンの内容を入力'
          />
        </div>
      </div>
    ))}

    <button className={styles.button} onClick={() => addNewReturn()}>
      <AiOutlinePlusCircle color='var(--light-primary-color)' />
      リターンを追加
    </button>
  </div>
)
