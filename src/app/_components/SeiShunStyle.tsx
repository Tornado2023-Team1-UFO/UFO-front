import Link from 'next/link'
import styles from './seiShunStyle.module.css'
import { Path } from '@/constants/path'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SeiShunStyle() {
  const router = useRouter()
  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundImage: 'url(/images/seisyun.svg)',
        }}
      >
        <button className={styles.buttonContainer} onClick={() => router.push(Path.EVENT_STYLE_DIAGNOSIS_TOP)}>
          <p className={styles.start}>はじめる</p>
        </button>
      </div>
    </>
  )
}
