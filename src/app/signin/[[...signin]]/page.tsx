import { SignIn } from '@clerk/nextjs'
import styles from './signin.module.css'

export default function Page() {
  return (
    <>
      <div>
        <SignIn afterSignInUrl='/events' />
      </div>
    </>
  )
}
