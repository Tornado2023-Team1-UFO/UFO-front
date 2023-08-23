import Link from 'next/link'
import styles from './seiShunStyle.module.css'
import { Path } from '@/constants/path'
import Image from 'next/image'

export default function SeiShunStyle() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src='https://s3-alpha-sig.figma.com/img/1876/1bd0/fef1d54589cbfe4658044e53ce111f0e?Expires=1693785600&Signature=ldoT6JXkja3tr1VYTmjtzU~yYLF-fBCUVF0GVLmrMa4qPHs9VUGViqjM1ANwZ4SBbdB0LaCsAcBaAfiCzdo66Nd6QBC3DpZ2IJwWkQmrBsF6fx5wx7kLFeVLxYsL3KN0VP6nCAGPyMJJe8hqMr77ECNgXwjIcD7aYCHF4CZDKO8QUOGLVBf0Oi~7cy7uJ0RJ6yrgoDJ0Mmf4BSDlWKMmtwJy4d-~aaytYqi-8sfohDp5bZi8De8KgRgsoHO3enDi5VJsOJ7FTkE~fOkiVo89toyVOjozkblb6VKOz4pQFd1UqqAWLW0uoASYKkThhgqC26uxDZYfWnINE~yqMlxVLA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt='青春診断イメージ'
            fill
            // style={{ objectFit: "contain"}}
          />
        </div>
        <div>
          <button className={styles.buttonContainer}>
            <Link className={styles.start} href={Path.EVENT_STYLE_DIAGNOSIS_TOP}>
              はじめる
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}
