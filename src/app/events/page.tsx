// This is a page that displays a list events
// imports from 'react'
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
// import components
import PageDetails from '@/components/PageDetails'
import EventCard from '@/app/events/_components/EventCard'

import SearchBar from './_components/SearchBar'
import EventContainer from './_components/EventContainer'
// import Header from '../components/Header';
import styles from '@/app/events/events.module.css'

function Events() {
  const [events, setEvents] = useState([]) // [state, setState]
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [occasions, setOccasions] = useState([])
  const [selectedOccasion, setSelectedOccasion] = useState('All')
  // Get events from database using useEffect
  // useEffect(() => {
  // }

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
