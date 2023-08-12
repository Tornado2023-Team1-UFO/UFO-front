import styles from '@/app/events/[id]/_components/eventinfo.module.css'
import { use, useEffect, useState } from 'react'
import Image from 'next/image'
// --- firebase ---
import { db } from '@/libs/firebase'
import { collection, getDoc, doc, DocumentData } from 'firebase/firestore'

export default function EventInfo(data: any) {
  let userId: string = ''
  const [loaded, setLoaded] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [imageURLs, setImageURLs] = useState<string[]>([])
  const [userInfo, setUserInfo] = useState<DocumentData>()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [imageIndex, setImageIndex] = useState<number>(0) // keep track of image index for the main image
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
      setStartDate(new Date(data.startAt))
      setEndDate(new Date(data.endAt))
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
  if (!loaded) return <p>Loading...</p>
  return (
    <>
      <div className={styles.eventimagecontainer}>
        {imageURLs.map((url: string, index: number) => {
          return (
            <div className={styles.maineventimage} style={{ display: index === imageIndex ? 'block' : 'none' }}>
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
              // width={80}
              // height={80}
              style={{
                objectPosition: 'center',
              }}
            />
          </div>
          <div className={styles.eventhostname}>
            <p>主催者名: {userInfo?.name}</p>
          </div>
        </div>
        <div className={styles.eventdate}>
          <p>開催日時</p>
          {/* <p>`${startDate?.getMonth() + 1}</p> */}
        </div>
        <div className={styles.eventextrainfo}>
          <div className={styles.count}>
            <p>人数</p>
            <p>{data.recruitPeopleCounts}</p>
          </div>
          <div className={styles.location}>
            <p>Location</p>
          </div>
          <div className={styles.cost}>
            <p>Cost</p>
          </div>
        </div>
        <div>
          <p>イベント概要</p>
          <p>{data.content}</p>
        </div>
      </div>
    </>
  )
}
