// This is a page that displays a list events
// imports from 'react'
'use client'
import { useState } from 'react'
// import components
import PageDetails from '@/components/PageDetails'
import SearchBar from './_components/SearchBar'
import EventContainer from './_components/EventContainer'

function Events() {
  let searchCategories = ['All', 'Tokyo', 'Osaka', 'Kyoto', 'Hokkaido']
  let eventCategories = ['人気上昇中のイベント', '夏の成長体験', '仲間と弾ける', 'インドアオタク集合']
  return (
    <>
      <PageDetails title='イベント一覧' description='イベント一覧ページです。' />
      <div className='container'>
        <SearchBar />
        {eventCategories.map((category) => (
          <EventContainer category={category} />
        ))}
      </div>
    </>
  )
}
export default Events
