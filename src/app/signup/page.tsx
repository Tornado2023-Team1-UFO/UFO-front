import { Path } from '@/constants/path'
import { SignUp } from '@clerk/nextjs'
import styles from './page.module.css'
export default function Page() {
  return (
    <div className={styles.center}>
      <SignUp afterSignUpUrl={Path.EVENT_LIST} />
    </div>
  )
}
