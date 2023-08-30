import { FallingLines } from 'react-loader-spinner'
import styles from './Loading.module.css'
import { FC } from 'react'

type Props = {
  text: string
}

export const Loading: FC<Props> = ({ text }) => (
  <div className={styles.container}>
    <h1 className={styles.text}>{text}</h1>
    <FallingLines color='var(--light-primary-color)' />
  </div>
)
