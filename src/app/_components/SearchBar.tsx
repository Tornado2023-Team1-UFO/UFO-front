import { useState } from 'react'
import styles from './searchBar.module.css'
import prefectureData from '@/app/data/prefectureData.json'
import { EVENT_CATEGORY_MASTER } from '@/app/events/create/_constants/categories'

interface searchBarProps {
  sendNewPrefecture: (newPrefecture: string) => void
  sendNewCategory: (newCategory: string) => void
}

export default function SearchBar({ sendNewPrefecture, sendNewCategory }: searchBarProps) {
  const [prefecture, setPrefecture] = useState('全地域')
  const [category, setCategory] = useState('全カテゴリー')
  function handleLocationSearch(newPrefecture: string) {
    setPrefecture(newPrefecture)
    sendNewPrefecture(newPrefecture)
  }
  function handleCategorySearch(newCategory: string) {
    setCategory(newCategory)
    sendNewCategory(newCategory)
  }
  return (
    <>
      <div className={styles.searchbar}>
        <div className={styles.searchbytext}>
          <input className={styles.keyword} type='text' placeholder='キーワードから探す' />
          <button className={styles.button}>検索</button>
        </div>
        <div className={styles.searchothers}>
          <div className={styles.searchotherschild}>
            <select className={styles.selectBox} name='location' onChange={(e) => handleLocationSearch(e.target.value)}>
              {prefectureData.map((prefecture: any) => (
                <option className={styles.prefectureName} key={prefecture.name} value={prefecture.name}>
                  {prefecture.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.searchotherschild}>
            <select className={styles.selectBox} name='category' onChange={(e) => handleCategorySearch(e.target.value)}>
              {EVENT_CATEGORY_MASTER.map((category: any) => (
                <option className={styles.prefectureName} key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
