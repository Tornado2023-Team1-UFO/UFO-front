import { Event } from '../_hooks/useEventCreate'
import styles from './EventLink.module.css'

type Props = {
  event: Event
  onChangeLinks: (link: string, type: string) => void
}

export const EventLink: React.FC<Props> = ({ event, onChangeLinks }) => {
  return (
    <div className={styles.input_container}>
      <input
        className={styles.input}
        defaultValue='https://twitter.com/'
        type='text'
        value={event.twitterLink}
        onChange={(e) => onChangeLinks(e.target.value, 'twitter')}
      />
      <input
        className={styles.input}
        defaultValue='https://www.instagram.com/'
        type='text'
        value={event.instagramLink}
        onChange={(e) => onChangeLinks(e.target.value, 'instagram')}
      />

      <div className={styles.labels}>
        <label htmlFor=''>応募ページ（任意）</label>
        <input
          className={styles.input}
          defaultValue='https://'
          type='text'
          value={event.applyLink}
          onChange={(e) => onChangeLinks(e.target.value, 'apply')}
        />
      </div>
    </div>
  )
}
