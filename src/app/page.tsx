// This is a page that displays a list events
// imports from 'react'
'use client'
import { useState } from 'react'
// import components
import PageDetails from '@/components/PageDetails'
import SearchBar from './_components/SearchBar'
import EventContainer from './_components/EventContainer'
import SeiShunStyle from './_components/SeiShunStyle'
import { eventCategories } from '@/constants/eventCategories'
import styles from './index.module.css'

export default function Events() {
  const [prefecture, setPrefecture] = useState('全地域')
  const [category, setCategory] = useState('全カテゴリー')
  const setNewPrefecture = (newPrefecture: string) => {
    setPrefecture(newPrefecture)
  }
  const setNewCategory = (newCategory: string) => {
    setCategory(newCategory)
  }
  return (
    <>
      <PageDetails title='イベント一覧' description='イベント一覧ページです。' />
      <div className={styles.container}>
        <SearchBar sendNewPrefecture={setNewPrefecture} sendNewCategory={setNewCategory} />
        <SeiShunStyle />
        {eventCategories.map((category) => (
          <EventContainer key={category} category={category} prefecture={prefecture} />
        ))}
      </div>
    </>
  )
}
