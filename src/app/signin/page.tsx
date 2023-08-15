import React from 'react'
import styles from './page.module.css'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className={styles.center}>
      <SignIn afterSignInUrl='/events' />
    </div>
  )
}
