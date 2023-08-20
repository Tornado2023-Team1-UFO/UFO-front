import { EventTag } from '@/components/EventTag'
import styles from './categoryHeadLine.module.css'
import { useRouter } from 'next/navigation'
import { Path } from '@/constants/path'
export default function CategoryHeadLine(props: any) {
  const { title } = props
  const router = useRouter()
  // handClick function when clicked on "もっと見る"
  // if clicked on "もっと見る", then it will jump to the "tinder" style swiping page
  const handleClick = () => {
    const url = Path.EVENT_SWIPE + `?category=${title}` // title is the category name
    router.push(url)
  }
  return (
    <>
      <div className={styles.categoryheadline}>
        <div className={styles.eventTag}>
          <EventTag title={title} />
        </div>
        <div className={styles.more}>
          <p onClick={handleClick}>もっと見る {'>'}</p>
        </div>
      </div>
    </>
  )
}
