import { useState } from 'react'
import styles from './searchBar.module.css'
import prefectureData from '@/app/data/prefectureData.json'

interface searchBarProps {
  sendDataToParent: (newPrefecture: string) => void
}

export default function SearchBar({ sendDataToParent }: searchBarProps) {
  const [prefecture, setPrefecture] = useState('全地域')
  function handleLocationSearch(newPrefecture: string) {
    setPrefecture(newPrefecture)
    sendDataToParent(newPrefecture)
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
        </div>
      </div>
    </>
  )
}
