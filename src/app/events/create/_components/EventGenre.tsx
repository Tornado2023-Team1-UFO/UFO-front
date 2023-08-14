import { FC } from 'react'
import { Title } from './common/Title'
import styles from './eventGenre.module.css'

type Props = {
  eventGenres: string[]
  onClickEventGenre: (eventGenre: string) => void
}

const eventGenreMaster = ['ハッカソン', 'ミートアップ', '勉強会', 'スポーツ', '文化祭']

export const EventGenre: FC<Props> = ({ eventGenres, onClickEventGenre }) => (
  <div>
    <Title title='当てはまるジャンルは？' />
    <div className={styles.cards}>
      {eventGenreMaster.map((eventGenre) => (
        <div
          key={eventGenre}
          style={{
            backgroundColor: eventGenres.includes(eventGenre) ? 'skyblue' : '#ffffff',
          }}
          className={styles.card}
          onClick={() => onClickEventGenre(eventGenre)}
        >
          {eventGenre}
        </div>
      ))}
    </div>
  </div>
)
