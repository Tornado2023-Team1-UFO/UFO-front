import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
// --- components ---
import Loading from '@/components/Loading'
import EventInfoFooter from './EventInfoFooter'
import styles from '@/app/events/[id]/_components/eventinfo.module.css'
import WebShareButton from '@/components/WebShareButton'
import { webShareData } from '@/components/webShareData'
// --- third party ---
import { FaLocationDot, FaPeopleGroup, FaYenSign } from 'react-icons/fa6'
import dayjs from 'dayjs'
// --- firebase ---
import { db } from '@/libs/firebase'
import { collection, getDoc, doc, DocumentData } from 'firebase/firestore'

export default function EventInfo(data: any) {
  let userId: string = ''
  const [loaded, setLoaded] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [imageURLs, setImageURLs] = useState<string[]>([])
  const [userInfo, setUserInfo] = useState<DocumentData>()
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [imageIndex, setImageIndex] = useState<number>(0) // keep track of image index for the main image
  const pathname = usePathname()
  // wait for the prop to load. It takes a little bit of time for the data(prop) to load so wait
  useEffect(() => {
    // if data is not empty then =>
    // loaded = true
    if (!loaded && Object.keys(data).length !== 0 && data.constructor === Object) {
      console.log('Loaded: ' + loaded)
      setLoaded(true)
    }
  })
  // get data from firebase
  useEffect(() => {
    // if the data is loaded and it is a initial load
    if (loaded && initialLoad) {
      console.log(data)
      userId = data.userId._key?.path?.segments[6]
      data.imageUrls.map((url: string) => {
        setImageURLs((imageURLs) => [...imageURLs, url])
      })
      // get date from data since date is UNIX timestamp
      console.log('start date is: ' + data.startAt.toDate())
      const startDate = dayjs(data.startAt.toDate()).format('YYYY/MM/DD(ddd)')
      const endDate = dayjs(data.endAt.toDate()).format('MM/DD(ddd)')
      setStartDate(startDate)
      setEndDate(endDate)
      console.log('startDate: ' + startDate)
      // contact firebase to get userInfo
      // currently userId is just a random number -> need get actual name and picture
      const fetchUserInfo = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUserInfo(userData)
            console.log('userinfo: ' + JSON.stringify(userInfo))
            // Now you can use 'eventData' to display your event details
          } else {
            console.log('User not found')
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
      fetchUserInfo()
      setInitialLoad(false) // once loaded it is not a initial load
    }
  }, [loaded])
  // function for changing the main image
  const changeMainImage = (index: number) => {
    setImageIndex(index)
  }
  const shareData: webShareData = {
    url: pathname,
    text: 'イベントをシェアしよう！',
    title: 'SNSでシェアしよう',
  }
  if (!loaded) return <Loading />
  return (
    <>
      <div className={styles.eventimagecontainer}>
        {imageURLs.map((url: string, index: number) => {
          return (
            <div
              key={url}
              className={styles.maineventimage}
              style={{ display: index === imageIndex ? 'block' : 'none' }}
            >
              <Image
                className='eventimage'
                key={url}
                src={url}
                alt='event image'
                fill
                style={{
                  display: index === imageIndex ? 'block' : 'none',
                }}
              />
              <WebShareButton {...{ ...shareData }} />
            </div>
          )
        })}
        <div className={styles.imagethumbnailscontainer}>
          {imageURLs.map((url: string, index) => {
            return (
              <div className={styles.imagethumbnails} key={url}>
                <Image
                  key={url}
                  src={url}
                  alt='event image'
                  fill
                  style={{
                    objectPosition: 'center',
                  }}
                  onClick={() => changeMainImage(index)}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.eventinfocontainer}>
        <div className={styles.eventtitle}>
          <h1>{data.title}</h1>
        </div>
        <div className={styles.eventhost}>
          <div className={styles.imagecontainer}>
            <Image
              src={userInfo?.photoURL}
              alt='user photo'
              fill
              style={{
                objectPosition: 'center',
              }}
            />
          </div>
          <div className={styles.eventhostname}>
            <p>主催者名: {userInfo?.name}</p>
          </div>
        </div>
        <div className={styles.eventDate}>
          <p className={styles.eventDateTitle}>開催日時</p>
          <p className={styles.eventDateSE}>
            {startDate} ~ {endDate}
          </p>
        </div>
        <div className={styles.eventExtraInfo}>
          <div className={styles.count}>
            <FaPeopleGroup className={styles.icon} />
            <p>{data.recruitPeopleCounts}</p>
          </div>
          <div className={styles.border}></div>
          <div className={styles.location}>
            <FaLocationDot className={styles.icon} />
            <p>{data.prefecture}</p>
          </div>
          <div className={styles.border}></div>
          <div className={styles.cost}>
            <FaYenSign className={styles.icon} />
            <p>{data.eventFee}</p>
          </div>
        </div>
        <div className={styles.eventContentContainer}>
          <p className={styles.eventContentTitle}>イベント概要</p>
          <p className={styles.eventContent}>{data.content}</p>
        </div>
      </div>
      <EventInfoFooter likeCounts={data.likeCounts} />
    </>
  )
}
