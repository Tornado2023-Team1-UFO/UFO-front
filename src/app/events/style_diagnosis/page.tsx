import { RedirectToSignIn, currentUser } from '@clerk/nextjs'

export default async function Page() {
  const user = await currentUser()
  if (!user) {
    window.alert('スタイル診断をするにはログインが必要です。')
    return <RedirectToSignIn />
  }
  return (
    <>
      <div></div>
    </>
  )
}
