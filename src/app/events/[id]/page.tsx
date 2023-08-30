'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EventInfo } from './_components/EventInfo'
import { EventsRepository } from '@/repositories/EventsRepository'
import { useAuth } from '@clerk/nextjs'
import { EventItem } from './_model/event'
import { toast } from 'react-hot-toast'
// -----  end of imports -- ---

export default function EventDetails() {
  // [id] = firebase のevent のunique id
  // firebase_id を受け取る
  // ex: const id: string = "jrJxJvnTsGINW9CfSm91";
  const param = useParams()
  const id = String(param.id)

  const auth = useAuth()
  const [data, setData] = useState<EventItem>()

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        try {
          const data = await EventsRepository.getEvent(id, String(auth.userId))
          setData(data)
        } catch (error) {
          toast.error('イベントの取得に失敗しました')
        }
      }
      fetchEventData()
    }
  }, [id])

  return (
    <>
      <EventInfo event={data} />
    </>
  )
}
