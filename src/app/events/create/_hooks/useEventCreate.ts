import { storage } from '@/libs/firebase'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { ChangeEvent, useState } from 'react'

export const section = new Map<number, string>([
  [1, 'EVENT_TITLE'],
  [2, 'TARGET_USER'],
  [3, 'EVENT_FEE'],
  [4, 'NUMBER_OF_PEOPLE'],
  [5, 'EVENT_DATE'],
  [6, 'EVENT_PLACE'],
  [7, 'EVENT_PLACE_DETAIL'],
  [8, 'EVENT_IMAGE'],
  [9, 'EVENT_DESCRIPTION'],
  [10, 'EVENT_CONFIRMATION'],
])

export type Event = {
  title: string
  targetUser: string
  eventFee: number
  recruitPeopleCount: number
  startAt: string
  endAt: string
  prefecture: string
  imageUrls: string[]
  description: string
  snsLink: string
  movieLink: string
}

type ReturnType = {
  currentSection: string | undefined
  event: Event
  region: string
  prefectures: string[]
  setCurrentSection: (section: string | undefined) => void
  changeEventTitle: (title: string) => void
  changeTargetUser: (targetUser: string) => void
  changeEventFee: (eventFee: number) => void
  changeRecruitPeopleCount: (recruitPeopleCount: number) => void
  changeStartAt: (startAt: string) => void
  changeEndAt: (endAt: string) => void
  clickRegion: (region: string) => void
  clickPrefecture: (prefecture: string) => void
  clickNextFromRecruitPeopleCount: () => void
  clickUploadImage: (e: ChangeEvent<HTMLInputElement>) => void
  changeDescription: (description: string) => void
  changeSnsLink: (snsLink: string) => void
  changeMovieLink: (movieLink: string) => void
  publishEvent: () => void
}

export const useEventCreate = (): ReturnType => {
  const [currentSection, setCurrentSection] = useState(section.get(1))
  const [region, setRegion] = useState<string>('')
  const [prefectures, setPrefectures] = useState<string[]>([])

  const [event, setEvent] = useState<Event>({
    title: '',
    targetUser: '',
    eventFee: 0,
    recruitPeopleCount: 0,
    startAt: '',
    endAt: '',
    prefecture: '',
    imageUrls: [],
    description: '',
    snsLink: '',
    movieLink: '',
  })

  const clickRegion = (region: string) => {
    setRegion(region)
    switch (region) {
      case '北海道 東北':
        setPrefectures(['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'])
        break
      case '関東':
        setPrefectures(['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'])
        break
      case '中部':
        setPrefectures(['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'])
        break
      case '関西':
        setPrefectures(['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'])
        break
      case '中国 四国':
        setPrefectures(['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'])
        break
      case '九州 沖縄':
        setPrefectures(['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'])
        break
      default:
        setPrefectures([])
    }
  }

  const clickNextFromRecruitPeopleCount = () => {
    // ここでchatgptに投げ,返ってきた文章をevent.contentに入れる
    setCurrentSection(section.get(5))
  }

  const clickUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    // ここで画像をアップロードする
    // アップロードした画像のURLをevent.imageUrlsに入れる
    const files = e.target.files
    if (!files) return
    const file = files[0]
    const storageRef = ref(storage, `events/${event.title}/${file.name}`)

    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)

    setEvent({ ...event, imageUrls: [...event.imageUrls, url] })
  }

  const publishEvent = () => {
    // ここでイベントを作成する
    // chatgptに投げイベントのタイプを返してもらう
    // firebase db登録
  }

  return {
    currentSection,
    event,
    region,
    prefectures,
    setCurrentSection,
    changeEventTitle: (title: string) => setEvent({ ...event, title }),
    changeTargetUser: (targetUser: string) => setEvent({ ...event, targetUser }),
    changeEventFee: (eventFee: number) => setEvent({ ...event, eventFee }),
    changeRecruitPeopleCount: (recruitPeopleCount: number) => setEvent({ ...event, recruitPeopleCount }),
    changeStartAt: (startAt: string) => setEvent({ ...event, startAt }),
    changeEndAt: (endAt: string) => setEvent({ ...event, endAt }),
    clickRegion: clickRegion,
    clickPrefecture: (prefecture: string) => setEvent({ ...event, prefecture }),
    clickNextFromRecruitPeopleCount: clickNextFromRecruitPeopleCount,
    clickUploadImage: clickUploadImage,
    changeDescription: (description: string) => setEvent({ ...event, description }),
    changeSnsLink: (snsLink: string) => setEvent({ ...event, snsLink }),
    changeMovieLink: (movieLink: string) => setEvent({ ...event, movieLink }),
    publishEvent: publishEvent,
  }
}
