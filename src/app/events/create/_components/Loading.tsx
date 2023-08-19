import { FallingLines } from 'react-loader-spinner'
import styles from './Loading.module.css'

export const Loading = () => (
  <div className={styles.container}>
    <h1 className={styles.text}>イベントを作成しています...</h1>
    <FallingLines color='skyblue' />
  </div>
)
