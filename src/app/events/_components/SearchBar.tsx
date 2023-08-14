import styles from './searchBar.module.css'
let searchCategories = ['All', 'Tokyo', 'Osaka', 'Kyoto', 'Hokkaido']
export default function SearchBar() {
  return (
    <>
      <div className={styles.searchbar}>
        <div className={styles.searchbytext}>
          <input type='text' placeholder='Search' />
          <button>検索</button>
        </div>
        <div className={styles.searchothers}>
          <div className={styles.searchotherschild}>
            <select name='location' onChange={() => alert('category changed')}>
              {searchCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
