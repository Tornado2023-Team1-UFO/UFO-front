import { FC } from 'react'
import styles from './title.module.css'
type Props = {
  title: string
}

export const Title: FC<Props> = ({ title }) => <h1 className={styles.title}>{title}</h1>
