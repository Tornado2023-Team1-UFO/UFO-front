import { Path } from '@/constants/path'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp afterSignUpUrl={Path.EVENT_LIST} />
}
