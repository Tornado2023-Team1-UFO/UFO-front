'use client'

import styles from './completed.module.css'
import { FC } from 'react'

type Props = {
  onClickSubmit: () => void
}

export const Completed: FC<Props> = ({ onClickSubmit }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.title_image}
        style={{
          backgroundImage: 'url(/images/hukidashi2.svg)',
        }}
      >
        <div className={styles.content}>
          <h1>お疲れ様でした 🎉</h1>
        </div>
      </div>
      <img width={355} height={237} src='/images/createSub3.png' alt='event create ilast' />

      <div className={styles.description}>
        <h3 className={styles.subtitle}>以下のボタンから公開してください</h3>
        <div className={styles.button_container}>
          <h3 className={styles.subtitle}>（少し時間がかかります）</h3>
          <img src='/images/barRight.svg' className={styles.bar_right} alt='わあ' />
          <img src='/images/barLeft.svg' className={styles.bar_left} alt='わあ' />
        </div>
        <button
          style={{
            marginTop: '38px',
          }}
          className={styles.button}
          onClick={() => onClickSubmit()}
        >
          はじめる
        </button>
      </div>
    </div>
  )
}
