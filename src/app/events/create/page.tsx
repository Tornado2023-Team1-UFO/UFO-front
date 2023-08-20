'use client'

import styles from './page.module.css'
import { EventTitle } from './_components/EventTitle'
import { EventFee } from './_components/EventFee'
import { NumberOfPeople } from './_components/NumberOfPeople'
import { EventDate } from './_components/EventDate'
import { EventPlace } from './_components/EventPlace'
import { EventPlaceDetail } from './_components/EventPlaceDetail'
import { EventImage } from './_components/EventImage'
import { EventDescription } from './_components/EventDescription'
import { EventCategory } from './_components/EventCategory'
import { PrevButton } from './_components/common/PrevButton'
import { NextButton } from './_components/common/NextButton'
import {
  CATEGORY_SECTION,
  DESCRIPTION_SECTION,
  EVENT_DATE_SECTION,
  EVENT_FEE_SECTION,
  EVENT_IMAGE_SECTION,
  EVENT_PREFECTURE_SECTION,
  EVENT_REGION_SECTION,
  PEOPLE_COUNT_SECTION,
  PUBLISH_SECTION,
  RETURN_SECTION,
  TITLE_SECTION,
  useEventCreate,
} from './_hooks/useEventCreate'
import { QuestionWithProgress } from './_components/common/QuestionWithProgress'
import { Loading } from './_components/Loading'
import { Return } from './_components/Return'
import { Completed } from './_components/Completed'
import { RedirectToSignIn, useAuth } from '@clerk/nextjs'
import { toast } from 'react-hot-toast'

const Page = () => {
  const {
    isLoading,
    currentSection,
    event,
    changeTitle,
    clickNextByTitle,
    clickPrevByTitle,
    changeCategory,
    clickNextByCategory,
    clickPrevByCategory,
    clickPrice,
    clickNumber,
    deletePrice,
    clickNextByEventFee,
    clickPrevByEventFee,
    clickPeopleCount,
    clickPeopleNumber,
    deletePeopleCount,
    clickNextByPeopleCount,
    clickPrevByPeopleCount,
    changeStartAt,
    changeEndAt,
    clickNextByEventDate,
    clickPrevByEventDate,
    region,
    clickRegion,
    clickNextByEventRegion,
    clickPrevByEventRegion,
    prefectures,
    clickPrefecture,
    clickNextByEventPrefecture,
    clickPrevByEventPrefecture,
    clickUploadImage,
    clickNextByImage,
    clickPrevByImage,
    changeDescription,
    clickNextByDescription,
    clickPrevByDescription,
    returns,
    addNewRuturn,
    changeReturnName,
    changeReturnAmount,
    changeContent,
    changeReturnImageUrl,
    clickNextByReturn,
    clickPrevByReturn,
    publishEvent,
    clickPrevByComplete,
  } = useEventCreate()

  const { userId } = useAuth()
  const renderComponent = () => {
    switch (currentSection) {
      case TITLE_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventTitle title={event.title} onChangeTitle={changeTitle} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByTitle} />
              <NextButton onClickButton={clickNextByTitle} />
            </div>
          </>
        )
      case CATEGORY_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventCategory selectedCategory={event.category} onClickCategory={changeCategory} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByCategory} />
              <NextButton onClickButton={clickNextByCategory} />
            </div>
          </>
        )

      case EVENT_FEE_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventFee
              eventFee={event.eventFee}
              onClickPrice={clickPrice}
              onClickNumber={clickNumber}
              onClickDelete={deletePrice}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByEventFee} />
              <NextButton onClickButton={clickNextByEventFee} />
            </div>
          </>
        )

      case PEOPLE_COUNT_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <NumberOfPeople
              numberOfPeople={event.recruitPeopleCount}
              onClickDelete={deletePeopleCount}
              onClickNumber={clickPeopleNumber}
              onClickPeople={clickPeopleCount}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByPeopleCount} />
              <NextButton onClickButton={clickNextByPeopleCount} />
            </div>
          </>
        )

      case EVENT_DATE_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventDate
              startAt={event.startAt}
              endAt={event.endAt}
              onChangeStartAt={changeStartAt}
              onChangeEndAt={changeEndAt}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByEventDate} />
              <NextButton onClickButton={clickNextByEventDate} />
            </div>
          </>
        )
      case EVENT_REGION_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventPlace region={region} onChangeRegion={clickRegion} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByEventRegion} />
              <NextButton onClickButton={clickNextByEventRegion} />
            </div>
          </>
        )

      case EVENT_PREFECTURE_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventPlaceDetail
              prefectures={prefectures}
              onChangePrefecture={clickPrefecture}
              selectedPrefecture={event.prefecture}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByEventPrefecture} />
              <NextButton onClickButton={clickNextByEventPrefecture} />
            </div>
          </>
        )

      case EVENT_IMAGE_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventImage imageUrls={event.imageUrls} onClickFileUpload={clickUploadImage} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByImage} />
              <NextButton onClickButton={clickNextByImage} />
            </div>
          </>
        )

      case DESCRIPTION_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <EventDescription description={event.description} onChangeDescription={changeDescription} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByDescription} />
              <NextButton onClickButton={clickNextByDescription} />
            </div>
          </>
        )

      case RETURN_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <Return
              returns={returns}
              onClickFileUpload={changeReturnImageUrl}
              onChangeReturnAmount={changeReturnAmount}
              onChangeReturnContent={changeContent}
              onChangeReturnName={changeReturnName}
              addNewReturn={addNewRuturn}
            />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByReturn} />
              <NextButton onClickButton={clickNextByReturn} />
            </div>
          </>
        )

      case PUBLISH_SECTION:
        return (
          <>
            <QuestionWithProgress progress={currentSection.progress} question={currentSection.value} />
            <Completed onClickSubmit={publishEvent} />
            <div className={styles.navigation}>
              <PrevButton onClickButton={clickPrevByComplete} />
            </div>
          </>
        )

      default:
        return null
    }
  }

  if (!userId) {
    toast.error('イベント作成にはログインが必要です')
    return <RedirectToSignIn />
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isLoading && <Loading />}
        {!isLoading && renderComponent()}
      </div>
    </div>
  )
}

export default Page
