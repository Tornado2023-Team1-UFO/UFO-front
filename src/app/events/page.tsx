// This is a page that displays a list events
// imports from 'react'
'use client'
import { useState } from 'react'
// import components
import PageDetails from '@/components/PageDetails'
import SearchBar from './_components/SearchBar'
import EventContainer from './_components/EventContainer'
import SeiShunStyle from './_components/SeiShunStyle'

function Events() {
  let searchCategories = ['All', 'Tokyo', 'Osaka', 'Kyoto', 'Hokkaido']
  let eventCategories = [
    '人気上昇中のイベント',
    '夏の成長体験',
    '仲間と弾ける',
    'インドアオタク集合',
    '新しい自分に出会う',
  ]
  return (
    <>
      <PageDetails title='イベント一覧' description='イベント一覧ページです。' />
      <div className='container'>
        <SearchBar />
        <SeiShunStyle />
        {eventCategories.map((category) => (
          <EventContainer key={category} category={category} />
        ))}
      </div>
    </>
  )
}
export default Events
