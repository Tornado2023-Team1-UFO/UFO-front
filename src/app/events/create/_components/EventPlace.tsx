import { FC } from 'react'
import styles from './eventPlace.module.css'

type Props = {
  region: string
  onChangeRegion: (region: string) => void
}

const REGION_MASTER = [
  {
    region: '北海道 東北',
    label: '北海道',
    label2: '東北エリア',
  },
  {
    region: '関東',
    label: '関東',
    label2: 'エリア',
  },
  {
    region: '中部',
    label: '中部',
    label2: 'エリア',
  },
  {
    region: '関西',
    label: '関西',
    label2: 'エリア',
  },
  {
    region: '中国 四国',
    label: '中国・四国',
    label2: 'エリア',
  },
  {
    region: '九州 沖縄',
    label: '九州・沖縄',
    label2: 'エリア',
  },
]

export const EventPlace: FC<Props> = ({ region, onChangeRegion }) => {
  return (
    <div className={styles.cards}>
      {REGION_MASTER.map((item) => (
        <div
          key={item.region}
          style={{
            backgroundColor: region === item.region ? 'var(--primary-color)' : 'var(--secondary-color)',
          }}
          className={styles.card}
          onClick={() => onChangeRegion(item.region)}
        >
          <div
            style={{
              color: region === item.region ? 'var(--secondary-color)' : 'var(--primary-color)',
            }}
          >
            <h1 className={styles.card_title}>{item.label}</h1>
            <h1 className={styles.card_title}>{item.label2}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}
