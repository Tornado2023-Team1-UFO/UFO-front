import React from 'react'
import styles from './page.module.css'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className={styles.center}>
      <SignUp />
    </div>
  )
}
