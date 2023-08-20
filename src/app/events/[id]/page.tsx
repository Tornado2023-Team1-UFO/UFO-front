'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// --- import firebase ---
import { db } from '@/libs/firebase'
import { collection, getDoc, doc } from 'firebase/firestore'
// --- import components ---
import EventInfo from './_components/EventInfo'
// -----  end of imports -- ---

export default function EventDetails() {
  // [id] = firebase のevent のunique id
  // firebase_id を受け取る
  // ex: const id: string = "jrJxJvnTsGINW9CfSm91";
  const param = useParams()
  const id = String(param.id)
  const [data, setData] = useState({})
  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        try {
          const eventDoc = await getDoc(doc(db, 'events', id))
          if (eventDoc.exists()) {
            const eventData = eventDoc.data()
            setData(eventData)
            // Now you can use 'eventData' to display your event details
          } else {
            console.log('Event not found')
          }
        } catch (error) {
          console.error('Error fetching event data:', error)
        }
      }
      fetchEventData()
    }
  }, [id])
  return (
    <>
      <EventInfo id={id} data={{ ...data }} />
    </>
  )
}
