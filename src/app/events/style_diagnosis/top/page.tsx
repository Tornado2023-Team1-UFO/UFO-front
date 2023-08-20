import Link from 'next/link'
import styles from './styleTop.module.css'

export default function Page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_subtitle}>
          <p className={styles.subtitle}>あなたはこの夏、どんな青春がしたい？</p>
          <h1 className={styles.title}>青春スタイル診断</h1>
        </div>
        <div>
          <p>質問に答えることであなたに合った青春イベントを診断するよ！</p>
        </div>
        <div>
          <button className={styles.buttonContainer}>
            <Link className={styles.button} href='events/style_diagnosis'>
              はじめる
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}
