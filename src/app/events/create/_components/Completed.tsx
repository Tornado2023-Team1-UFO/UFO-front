'use client'

import styles from './Completed.module.css'
import { FC } from 'react'

type Props = {
  onClickSubmit: () => void
}

export const Completed: FC<Props> = ({ onClickSubmit }) => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h1 className={styles.title}>お疲れ様でした🎉</h1>
        <div>
          <h3 className={styles.subtitle}>以下のボタンから公開してください</h3>
          <h3 className={styles.subtitle}>イベントの公開には少し時間がかかります</h3>
        </div>
      </div>
      <button className={styles.button} onClick={onClickSubmit}>
        公開する
      </button>
    </div>
  )
}
