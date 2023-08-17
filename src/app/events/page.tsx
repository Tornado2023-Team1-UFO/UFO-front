// This is a page that displays a list events
// imports from 'react'
'use client'
import { useState } from 'react'
// import components
import PageDetails from '@/components/PageDetails'
import SearchBar from './_components/SearchBar'
import EventContainer from './_components/EventContainer'
import SeiShunStyle from './_components/SeiShunStyle'

export default function Events() {
  const [prefecture, setPrefecture] = useState('地域で絞り込む')
  const handleChildData = (newPrefecture: string) => {
    setPrefecture(newPrefecture)
  }
  let eventCategories = [
    '人気上昇中のイベント',
    '夏の成長体験',
    '仲間と弾ける',
    'インドアオタク集合',
    '新しい自分に出会う',
  ]
  console.log('New Prefecture inside Page.tsx is ' + prefecture)
  return (
    <>
      <PageDetails title='イベント一覧' description='イベント一覧ページです。' />
      <div className='container'>
        <SearchBar sendDataToParent={handleChildData} />
        <SeiShunStyle />
        {eventCategories.map((category) => (
          <EventContainer key={category} category={category} prefecture={prefecture} />
        ))}
      </div>
    </>
  )
}
