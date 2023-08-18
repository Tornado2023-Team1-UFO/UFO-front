import styles from './seiShunStyle.module.css'

export default function SeiShunStyle() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <p className={styles.title}>あなたはこの夏、どんな青春がしたい？</p>
        </div>
        <div>
          <p className={styles.title2}>青春スタイル診断</p>
        </div>
        <div>
          <button className={styles.buttonContainer}>はじめる</button>
        </div>
      </div>
    </>
  )
}
