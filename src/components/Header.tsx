'use client'

import styles from './header.module.css'
import Link from 'next/link'
import Login from './Login'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Path } from '@/constants/path'
import Image from 'next/image'
import { NavigationHeader } from './navigationHeader'
// header fix
export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoImage}>
            <Link className={styles.link} href={Path.EVENT_LIST}>
              <Image
                src='https://s3-alpha-sig.figma.com/img/e6bc/4b49/35cfd95c0b10bfd5bb8556850c982983?Expires=1693785600&Signature=kctZ6F-m3k4HNNIJ8CVx6XED5ft4bmaYIf3n4LxFRoreOsmjAkuxtbsEULcbhiw8f0BqTYZyYA4iayyhjhb65okvdnFBxrJtm~nRNx876iBXTDxuSiGESyr2oHQm~XiJpQpt31Mbdwh3eEaf2qwMN9RD0t4jvCCORukezWC5NilKjZMDNInJrNIF65VXPvgQ-hP3ZLnbgV3UxEWSnnfsvuIjAVZpWUFKVd5lj6DBnnC1EMj6KyOC-TmUlfccimWzmPKazygAAGliegK3p~wBqNBwItWX-cNaqUQlWTl2Mt4oqy4Cgk-nGOExhJogcD0XZL5GpqmAh~-H3XpUWHmMvg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt='logo'
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </Link>
          </div>
        </div>
        <div className={styles.navigationLarge}>
          <NavigationHeader />
        </div>
        <SignedIn>
          <div className={styles.userButton}>
            <UserButton afterSignOutUrl={Path.EVENT_LIST} />
          </div>
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </header>
      <div className={styles.navigationSmall}>
        <NavigationHeader />
      </div>
    </>
  )
}
