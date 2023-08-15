import { EventTag } from '@/components/EventTag'
import styles from './categoryHeadLine.module.css'
import { useRouter } from 'next/navigation'
export default function CategoryHeadLine(props: any) {
  const router = useRouter()
  const { title } = props
  // handClick function when clicked on "もっと見る"
  // if clicked on "もっと見る", then it will jump to the "tinder" style swiping page
  const handleClick = () => {
    router.push(`/event?category=${title}`)
  }
  return (
    <>
      <div className={styles.categoryheadline}>
        <EventTag title={title} />
        <div>
          <p onClick={handleClick}>もっと見る {'>'}</p>
        </div>
      </div>
    </>
  )
}
