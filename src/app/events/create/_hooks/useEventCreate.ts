import { storage } from '@/libs/firebase'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { ChangeEvent, useState } from 'react'
import { nextApi } from '@/libs/axios'
import { EventsRepository } from '@/repositories/EventsRepository'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Path } from '@/constants/path'
import { useAuth } from '@clerk/nextjs'
import { Timestamp } from 'firebase/firestore'
import { ReturnRepository } from '@/repositories/ReturnRepository'

type Section = {
  progress: number
  value: string
}

export const TITLE_SECTION: Section = {
  progress: 10,
  value: 'イベントタイトルは？',
}

export const CATEGORY_SECTION: Section = {
  progress: 20,
  value: '当てはまるカテゴリーはどれ？',
}

export const EVENT_FEE_SECTION: Section = {
  progress: 30,
  value: '1人あたりの参加費は？',
}

export const PEOPLE_COUNT_SECTION: Section = {
  progress: 40,
  value: '目標参加人数は？',
}

export const EVENT_DATE_SECTION: Section = {
  progress: 50,
  value: '開催日はいつ？',
}

export const EVENT_REGION_SECTION: Section = {
  progress: 60,
  value: '開催地域はどこ？',
}

export const EVENT_PREFECTURE_SECTION: Section = {
  progress: 60,
  value: '開催地域はどこ？',
}

export const EVENT_IMAGE_SECTION: Section = {
  progress: 70,
  value: '画像をアップロードしよう（任意）',
}

export const DESCRIPTION_SECTION: Section = {
  progress: 80,
  value: 'イベントの説明を書こう！',
}

export const RETURN_SECTION: Section = {
  progress: 90,
  value: 'リターンを追加しよう(任意)',
}

export const PUBLISH_SECTION: Section = {
  progress: 100,
  value: 'イベントを公開しよう！',
}

export type Event = {
  title: string
  category: string[]
  eventFee: number
  recruitPeopleCount: number
  startAt: string
  endAt: string
  prefecture: string
  imageUrls: string[]
  description: string
}

export type Return = {
  name: string
  amount: number
  imageUrl: string
  nickname: string
  content: string
}

export const useEventCreate = () => {
  const { userId } = useAuth()
  const [currentSection, setCurrentSection] = useState<Section>(TITLE_SECTION)
  const [region, setRegion] = useState<string>('')
  const [prefectures, setPrefectures] = useState<string[]>([])
  const [returns, setReturns] = useState<Return[]>([
    {
      name: '',
      amount: 0,
      imageUrl: '',
      nickname: 'nicname',
      content: '',
    },
  ])
  const router = useRouter()

  const [event, setEvent] = useState<Event>({
    title: '',
    category: [],
    eventFee: 0,
    recruitPeopleCount: 0,
    startAt: '',
    endAt: '',
    prefecture: '',
    imageUrls: [],
    description: '',
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>('処理中...')

  const clickRegion = (region: string) => {
    setLoadingText('AIが説明を生成中...')
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

  const getRandomFileName = () => {
    if (event.category.length === 0) return
    const randomIndex = Math.floor(Math.random() * event.category.length)

    const category = event.category[randomIndex]

    switch (category) {
      case 'IT・開発':
        return 'T_IT.jpg'
      case 'スポーツ':
        return 'T_sports.jpg'
      case '音楽':
        return 'T_music.jpg'
      case '芸術':
        return 'T_art.jpg'
      case 'デザイン':
        return 'T_design.jpg'
      case 'ファッション':
        return 'T_fashion.jpg'
      case '料理':
        return 'T_cooking.jpg'
      case 'ゲーム':
        return 'T_game.jpg'
      case 'カフェ':
        return 'T_cafe.jpg'
      case '山':
        return 'T_mountain.jpg'
      case '海':
        return 'T_sea.jpg'
      case '映画':
        return 'T_movie.jpg'
      case '旅行':
        return 'T_trip.jpg'
      case '語学':
        return 'T_gogaku.jpg'
      case '車':
        return 'T_car.jpg'
      case 'カメラ':
        return 'T_camera.jpg'
      case '食べ歩き':
        return 'T_walkingLunch.jpg'
      case '散歩':
        return 'T_sanpo.jpg'
      case 'お笑い':
        return 'T_owarai.jpg'
      case 'アニメ':
        return 'T_anime.jpg'
      case '交流会':
        return 'T_kouryuu.jpg'
      case 'プログラミング':
        return 'T_programing.jpg'
      case 'その他':
        return 'T_kouryuu.jpg'
      default:
        return 'T_kouryuu.jpg'
    }
  }

  const clickNextByImage = async () => {
    let defaultImageUrl = ''
    if (event.imageUrls.length === 0) {
      if (window.confirm('イメージをアップロードしない場合は、デフォルトの画像になりますが、よろしいですか？')) {
        const fileName = getRandomFileName()
        const storageRef = ref(storage, `default/${fileName}`)
        const url = await getDownloadURL(storageRef)

        defaultImageUrl = url
      } else {
        return
      }
    }

    if (isLoading) return

    setIsLoading(true)
    const message = `あなたは、イベントの主催者です。以下のイベントに参加したくなるような文章を300文字で書いてください。
    イベントのタイトル ${event.title}
    カテゴリー ${event.category}
    一人当たりの参加費 ${event.eventFee}円
    目標人数 ${event.recruitPeopleCount}人
    開催地 ${event.prefecture}
    日時 ${event.startAt}から${event.endAt}
    
    
    例：
    入力
    イベントのタイトル Tornade
    ジャンル ハッカソン
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

    if (event.imageUrls.length === 0) {
      setEvent({ ...event, description: data.content, imageUrls: [defaultImageUrl] })
    } else {
      setEvent({ ...event, description: data.content })
    }
    setCurrentSection(DESCRIPTION_SECTION)

    setIsLoading(false)
  }

  const clickUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (event.imageUrls.length >= 6) {
      toast.error('画像は6枚までしかアップロードできません')
      return
    }

    const files = e.target.files

    if (!files) return
    const file = files[0]
    const storageRef = ref(storage, `events/${event.title}/${file.name}`)

    await uploadBytes(storageRef, file)
    let url = ''
    try {
      url = await getDownloadURL(storageRef)
    } catch (e) {
      toast.error('画像のアップロードに失敗しました')
    }

    setEvent({ ...event, imageUrls: [...event.imageUrls, url] })
  }

  const publishEvent = async () => {
    if (isLoading) return
    setIsLoading(true)

    const categories = ['夏の成長体験', '仲間とハジける', '新しい自分に出会う', '']
    const message = `次のイベントは、どのカテゴリーに分類されるでしょうか？
    選択肢の中から１つ選んでください。
    選択肢:
    夏の成長体験
    ${categories[0]}
    ${categories[1]}
    ${categories[2]}
    ${categories[3]}


    イベントのタイトル ${event.title}
    カテゴリー ${event.category}
    一人当たりの参加費 ${event.eventFee}円
    目標人数 ${event.recruitPeopleCount}人
    開催地 ${event.prefecture}
    日時 ${event.startAt}から${event.endAt}
    イベントの説明 ${event.description}


    例：
    入力:
    イベントのタイトル Tornade
    ジャンル ハッカソン
    一人当たりの参加費 0円
    目標人数 100人
    開催地 東京都
    日時 2023年8月1日から2023年9月9日
    イベントの説明 今回で開催3回目となる「トルネード」は、個人で参加できる
    オンライン型ハッカソンです。 
    チームは、6人1チームで構成され「プロダクトオーナー」
    「デザイナー」「エンジニア」のそれぞれの役割の中で
    1ヵ月間協力し合います。


    出力:
    夏の成長体験
    `

    try {
      const { data } = await nextApi.post('/chatgpts/events/descriptions', {
        message: message,
      })

      const category = categories.find((category) => category === data.content)
      const eventId = await EventsRepository.postEvent({
        title: event.title,
        userId: `${userId}`,
        status: 1,
        content: event.description,
        eventFee: event.eventFee,
        prefecture: event.prefecture,
        startAt: Timestamp.fromDate(new Date(event.startAt)),
        endAt: Timestamp.fromDate(new Date(event.endAt)),
        deadLine: Timestamp.fromDate(new Date(event.startAt)),
        likeCounts: 0,
        imageUrls: event.imageUrls,
        recruitPeopleCounts: event.recruitPeopleCount,
        updatedAt: Timestamp.fromDate(new Date()),
        category: category ?? '新しい自分に出会う',
      })

      await ReturnRepository.postReturn(eventId, returns)
      toast.success('イベントを作成しました！')
      router.push(Path.EVENT_LIST)
    } catch (error) {
      console.log(error)
      toast.error('予期しないエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const addNewRuturn = () => {
    setReturns([...returns, { name: '', amount: 0, imageUrl: '', nickname: '', content: '' }])
  }

  const changeReturnName = (index: number, name: string) => {
    const newReturns = returns.map((r, i) => {
      if (i === index) {
        return { ...r, name: name }
      }
      return r
    })
    setReturns(newReturns)
  }

  const changeReturnAmount = (index: number, amount: number) => {
    const newReturns = returns.map((r, i) => {
      if (i === index) {
        return { ...r, amount: amount }
      }
      return r
    })
    setReturns(newReturns)
  }

  const changeContent = (index: number, content: string) => {
    const newReturns = returns.map((r, i) => {
      if (i === index) {
        return { ...r, content: content }
      }
      return r
    })
    setReturns(newReturns)
  }

  const changeReturnImageUrl = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newReturns = []
    for (const [i, r] of returns.entries()) {
      if (i === index) {
        const files = e.target.files
        if (!files) continue
        const file = files[0]
        const storageRef = ref(storage, `returns/${event.title}/${file.name}`)

        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)

        newReturns.push({ ...r, imageUrl: url })
      } else {
        newReturns.push(r)
      }
    }
    setReturns(newReturns)
  }

  // Title
  const clickNextByTitle = () => {
    if (event.title === '') {
      toast.error('タイトルを入力してください')
      return
    }

    setCurrentSection(CATEGORY_SECTION)
  }

  const clickPrevByTitle = () => {
    router.push(Path.EVENT_CREATE_TOP)
  }

  // Category
  const changeCategory = (selectedCategory: string) => {
    const isSelected = event.category.includes(selectedCategory)

    if (isSelected) {
      const newCategory = event.category.filter((c) => c !== selectedCategory)
      setEvent({ ...event, category: newCategory })
      return
    }
    if (event.category.length >= 3) {
      toast.error('カテゴリーは3つまで選択できます')
      return
    }
    setEvent({ ...event, category: [...event.category, selectedCategory] })
  }

  const clickNextByCategory = () => {
    if (event.category.length === 0) {
      toast.error('1つはカテゴリーを選択してください')
      return
    }

    setCurrentSection(EVENT_FEE_SECTION)
  }

  const clickPrevByCategory = () => {
    setCurrentSection(TITLE_SECTION)
  }

  const clickPrice = (price: number) => {
    setEvent({ ...event, eventFee: price })
  }

  const clickPeopleCount = (peopleCount: number) => {
    setEvent({ ...event, recruitPeopleCount: peopleCount })
  }

  const clickNumber = (num: string) => {
    const newNum = event.eventFee + num
    if (Number(newNum) < 0) return

    if (newNum.length >= 7) {
      toast.error('7桁までしか入力できません')
      return
    }
    setEvent({ ...event, eventFee: Number(newNum) })
  }

  const clickPeopleNumber = (num: string) => {
    const newNum = event.recruitPeopleCount + num
    if (Number(newNum) < 0) return

    if (newNum.length >= 7) {
      toast.error('7桁までしか入力できません')
      return
    }
    setEvent({ ...event, recruitPeopleCount: Number(newNum) })
  }

  const deletePrice = () => {
    const newPrice = event.eventFee.toString().slice(0, -1)
    if (Number(newPrice) < 0) return
    setEvent({ ...event, eventFee: Number(newPrice) })
  }

  const deletePeopleCount = () => {
    const newPeopleCount = event.recruitPeopleCount.toString().slice(0, -1)
    if (Number(newPeopleCount) < 0) return
    setEvent({ ...event, recruitPeopleCount: Number(newPeopleCount) })
  }

  const clickNextByEventFee = () => {
    setCurrentSection(PEOPLE_COUNT_SECTION)
  }

  const clickPrevByEventFee = () => {
    setCurrentSection(CATEGORY_SECTION)
  }

  const clickNextByPeopleCount = () => {
    setCurrentSection(EVENT_DATE_SECTION)
  }

  const clickPrevByPeopleCount = () => {
    setCurrentSection(EVENT_FEE_SECTION)
  }

  const changeStartAt = (startAt: string) => {
    setEvent({ ...event, startAt: startAt })
  }

  const changeEndAt = (endAt: string) => {
    setEvent({ ...event, endAt: endAt })
  }

  const clickNextByEventDate = () => {
    if (event.startAt === '' || event.endAt === '') {
      toast.error('開催日を入力してください')
      return
    }

    if (new Date(event.startAt) < new Date()) {
      toast.error('開催日は明日以降にしてください')
      return
    }

    if (event.startAt > event.endAt) {
      toast.error('終了日は開始日より後にしてください')
      return
    }

    setCurrentSection(EVENT_REGION_SECTION)
  }

  const clickPrevByEventDate = () => {
    setCurrentSection(PEOPLE_COUNT_SECTION)
  }

  const clickNextByEventRegion = () => {
    if (region === '') {
      toast.error('開催地域を選択してください')
      return
    }
    setCurrentSection(EVENT_PREFECTURE_SECTION)
  }

  const clickPrevByEventRegion = () => {
    setCurrentSection(EVENT_DATE_SECTION)
  }

  const clickPrefecture = (prefecture: string) => {
    setEvent({ ...event, prefecture: prefecture })
  }

  const clickNextByEventPrefecture = () => {
    if (event.prefecture === '') {
      toast.error('都道府県を選択してください')
      return
    }
    setCurrentSection(EVENT_IMAGE_SECTION)
  }

  const clickPrevByEventPrefecture = () => {
    setCurrentSection(EVENT_REGION_SECTION)
  }

  const clickPrevByImage = () => {
    setCurrentSection(EVENT_PREFECTURE_SECTION)
  }

  const changeDescription = (description: string) => {
    setEvent({ ...event, description: description })
  }

  const clickPrevByDescription = () => {
    setCurrentSection(EVENT_IMAGE_SECTION)
  }

  const clickNextByDescription = () => {
    setCurrentSection(RETURN_SECTION)
  }

  const clickNextByReturn = () => {
    setLoadingText('イベントを作成中...')

    const filteredReturns = returns.filter((r) => r.name !== '' && r.amount !== 0 && r.content !== '')
    setReturns(filteredReturns)
    setCurrentSection(PUBLISH_SECTION)
  }

  const clickPrevByReturn = () => {
    setCurrentSection(DESCRIPTION_SECTION)
  }

  const clickPrevByComplete = () => {
    setCurrentSection(RETURN_SECTION)
  }

  return {
    isLoading,
    currentSection,
    event,
    // Title
    changeTitle: (title: string) => setEvent({ ...event, title: title }),
    clickNextByTitle: clickNextByTitle,
    clickPrevByTitle: clickPrevByTitle,
    // Category
    changeCategory: changeCategory,
    clickNextByCategory: clickNextByCategory,
    clickPrevByCategory: clickPrevByCategory,
    // EventFee
    clickPrice: clickPrice,
    clickNumber: clickNumber,
    deletePrice: deletePrice,
    clickNextByEventFee: clickNextByEventFee,
    clickPrevByEventFee: clickPrevByEventFee,
    // PeopleCount
    clickPeopleCount: clickPeopleCount,
    clickPeopleNumber: clickPeopleNumber,
    deletePeopleCount: deletePeopleCount,
    clickNextByPeopleCount: clickNextByPeopleCount,
    clickPrevByPeopleCount: clickPrevByPeopleCount,
    // EventDate
    changeStartAt: changeStartAt,
    changeEndAt: changeEndAt,
    clickNextByEventDate: clickNextByEventDate,
    clickPrevByEventDate: clickPrevByEventDate,
    // EventRegion
    region: region,
    clickRegion: clickRegion,
    clickNextByEventRegion: clickNextByEventRegion,
    clickPrevByEventRegion: clickPrevByEventRegion,
    // EventPrefecture
    prefectures: prefectures,
    clickPrefecture: clickPrefecture,
    clickNextByEventPrefecture: clickNextByEventPrefecture,
    clickPrevByEventPrefecture: clickPrevByEventPrefecture,
    // EventImage
    clickUploadImage: clickUploadImage,
    clickNextByImage: clickNextByImage,
    clickPrevByImage: clickPrevByImage,
    // EventDescription
    changeDescription: changeDescription,
    clickNextByDescription: clickNextByDescription,
    clickPrevByDescription: clickPrevByDescription,
    // Return
    returns: returns,
    addNewRuturn: addNewRuturn,
    changeReturnName: changeReturnName,
    changeReturnAmount: changeReturnAmount,
    changeContent: changeContent,
    changeReturnImageUrl: changeReturnImageUrl,
    clickNextByReturn: clickNextByReturn,
    clickPrevByReturn: clickPrevByReturn,
    // Publish
    publishEvent: publishEvent,
    clickPrevByComplete: clickPrevByComplete,
    loadingText,
  }
}
