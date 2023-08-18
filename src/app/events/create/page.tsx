'use client'

import { EventTitle } from './_components/EventTitle'
import { EventFee } from './_components/EventFee'
import { NumberOfPeople } from './_components/NumberOfPeople'
import { EventDate } from './_components/EventDate'
import { EventPlace } from './_components/EventPlace'
import { EventPlaceDetail } from './_components/EventPlaceDetail'
import { EventImage } from './_components/EventImage'
import { EventDescription } from './_components/EventDescription'
import { EventConfirmation } from './_components/EventConfirmation'
import { useEventCreate } from './_hooks/useEventCreate'
import { section } from './_hooks/useEventCreate'
import { EventGenre } from './_components/EventGenre'
import styles from './index.module.css'
import ProgressBar from '@ramonak/react-progress-bar'
import { PrevButton } from './_components/common/PrevButton'
import { useRouter } from 'next/navigation'
import { NextButton } from './_components/common/NextButton'
import { Path } from '@/constants/path'

const Page = () => {
  const {
    currentSection,
    setCurrentSection,
    event,
    region,
    returns,
    prefectures,
    changeEventTitle,
    changeEventFee,
    changeRecruitPeopleCount,
    changeStartAt,
    changeEndAt,
    clickRegion,
    clickPrefecture,
    clickUploadImage,
    changeDescription,
    changeSnsLink,
    changeMovieLink,
    publishEvent,
    clickNextToDescription,
    clickGenre,
    addRuturn,
  } = useEventCreate()

  const router = useRouter()

  const renderComponent = () => {
    switch (currentSection) {
      case section.get(1):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' margin='46px 0px' completed={0} customLabel=' ' />
            <EventTitle title={event.title} onChangeTitle={changeEventTitle} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => Path.EVENT_CREATE_TOP} />
              <NextButton onClickButton={() => setCurrentSection(section.get(2))} />
            </div>
          </div>
        )
      case section.get(2):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 2}`} customLabel=' ' />
            <EventGenre eventGenres={event.genre} onClickEventGenre={clickGenre} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(1))} />
              <NextButton onClickButton={() => setCurrentSection(section.get(3))} />
            </div>
          </div>
        )
      case section.get(3):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 3}`} customLabel=' ' />
            <EventFee
              eventFee={event.eventFee}
              onChangeEventFee={changeEventFee}
              onClickNext={() => setCurrentSection(section.get(4))}
              onClickPrev={() => setCurrentSection(section.get(2))}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(2))} />
              <NextButton onClickButton={() => setCurrentSection(section.get(4))} />
            </div>
          </div>
        )
      case section.get(4):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 4}`} customLabel=' ' />
            <NumberOfPeople
              numberOfPeople={event.recruitPeopleCount}
              onChangeNumberOfPeople={changeRecruitPeopleCount}
              onClickNext={() => setCurrentSection(section.get(5))}
              onClickPrev={() => setCurrentSection(section.get(3))}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(3))} />
              <NextButton onClickButton={() => setCurrentSection(section.get(5))} />
            </div>
          </div>
        )
      case section.get(5):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 5}`} customLabel=' ' />
            <EventDate
              startAt={event.startAt}
              endAt={event.endAt}
              onChangeStartAt={changeStartAt}
              onChangeEndAt={changeEndAt}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(4))} />
              <NextButton onClickButton={() => setCurrentSection(section.get(6))} />
            </div>
          </div>
        )
      case section.get(6):
        return (
          <div className={styles.contentß}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 6}`} customLabel=' ' />
            <EventPlace region={region} onChangeRegion={clickRegion} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(5))} />
              <NextButton onClickButton={() => setCurrentSection(section.get(7))} />
            </div>
          </div>
        )
      case section.get(7):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 7}`} customLabel=' ' />
            <EventPlaceDetail
              prefectures={prefectures}
              onChangePrefecture={clickPrefecture}
              selectedPrefecture={event.prefecture}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(6))} />
              <NextButton onClickButton={() => setCurrentSection(section.get(8))} />
            </div>
          </div>
        )
      case section.get(8):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 8}`} customLabel=' ' />
            <EventImage imageUrls={event.imageUrls} onClickFileUpload={clickUploadImage} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(7))} />
              <NextButton onClickButton={() => clickNextToDescription()} />
            </div>
          </div>
        )
      case section.get(9):
        return (
          <div className={styles.content}>
            <ProgressBar bgColor='blue' completed={`${(100 / section.size) * 9}`} customLabel=' ' />
            <EventDescription description={event.description} onChangeDescription={changeDescription} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={() => setCurrentSection(section.get(8))} />
              <NextButton onClickButton={() => setCurrentSection(section.get(10))} />
            </div>
          </div>
        )
      case section.get(10):
        return (
          <div className={styles.content}>
            <EventConfirmation
              addReturn={addRuturn}
              returns={returns}
              event={event}
              onClickSubmit={publishEvent}
              onChangeMovieLink={changeMovieLink}
              onChangeSnsLink={changeSnsLink}
            />
          </div>
        )
      default:
        return null
    }
  }
  return <div className={styles.container}>{renderComponent()}</div>
}

export default Page
