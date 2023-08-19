import PageDetails from './PageDetails'
import styles from './loading.module.css'

function Loading() {
  return (
    <>
      <PageDetails title='Loading...' description='Loading page' />
      <div>Page Loading...</div>
      <div className={styles.loadingWrapper}>
        <div className={styles.loading}></div>
      </div>
    </>
  )
}

export default Loading
