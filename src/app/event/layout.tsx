import { NavigationHeader } from '@/components/navigationHeader'
import { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <div>
    <NavigationHeader />
    {children}
  </div>
)

export default Layout
