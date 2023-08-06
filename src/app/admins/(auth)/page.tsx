'use client'

import { useAuth } from '@/app/_hooks/useAuth'

const AdminTop = () => {
  const { Logout } = useAuth()
  return (
    <div>
      <h1>AdminTop</h1>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  )
}

export default AdminTop
