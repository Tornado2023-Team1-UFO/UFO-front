import { storage } from '@/libs/firebase'
import axios from 'axios'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { ChangeEvent, useState } from 'react'
import { nextApi } from '@/libs/axios'

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
  clickUploadImage: (e: ChangeEvent<HTMLInputElement>) => void
  changeDescription: (description: string) => void
  changeSnsLink: (snsLink: string) => void
  changeMovieLink: (movieLink: string) => void
  publishEvent: () => void
  clickNextToDescription: () => void
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

  const clickNextToDescription = async () => {
    const message = `あなたは、イベントの主催者です。以下のイベントに参加したくなるような文章を300文字で書いてください。
    イベントのタイトル ${event.title}
    対象ユーザー ${event.targetUser}
    一人当たりの参加費 ${event.eventFee}円
    目標人数 ${event.recruitPeopleCount}人
    開催地 ${event.prefecture}
    日時 ${event.startAt}から${event.endAt}
    
    
    例：
    入力
    イベントのタイトル Tornade
    対象ユーザー 10代から20代のユーザー
    一人当たりの参加費 0円
    目標人数 100人
    開催地 東京都
    日時 2023年8月1日から2023年9月9日
    
    出力
    今回で開催3回目となる「トルネード」は、個人で参加できる
    オンライン型ハッカソンです。
    
    チームは、6人1チームで構成され「プロダクトオーナー」
    「デザイナー」「エンジニア」のそれぞれの役割の中で
    1ヵ月間協力し合います。
    各チームには、メンターとしてサポーター企業がつき、
    自分たちの企画や開発に関してプロからの実用的なアドバイスを
    もらうことができます。
    
    普段関わることのないような地域、分野の学生たちと
    「ディスカッション」「プロダクト開発」「プレゼンテーション」の
    活動を通して、最高の成長体験をつかみましょう！`

    // ここでchatgptに投げ,返ってきた文章をevent.contentに入れる
    const { data } = await nextApi.post('/chatgpts/events/descriptions', {
      message: message,
    })
    setEvent({ ...event, description: data.content })
    setCurrentSection(section.get(9))
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
    clickUploadImage: clickUploadImage,
    changeDescription: (description: string) => setEvent({ ...event, description }),
    changeSnsLink: (snsLink: string) => setEvent({ ...event, snsLink }),
    changeMovieLink: (movieLink: string) => setEvent({ ...event, movieLink }),
    publishEvent: publishEvent,
    clickNextToDescription: clickNextToDescription,
  }
}
