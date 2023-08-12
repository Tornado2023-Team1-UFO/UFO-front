'use client'

import { EventTitle } from './_components/EventTitle'
import { TargetUser } from './_components/TargetUser'
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

const Page = () => {
  const {
    currentSection,
    setCurrentSection,
    event,
    region,
    prefectures,
    changeEventTitle,
    changeTargetUser,
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
  } = useEventCreate()

  const renderComponent = () => {
    switch (currentSection) {
      case section.get(1):
        return (
          <EventTitle
            title={event.title}
            onChangeTitle={changeEventTitle}
            onClickNext={() => setCurrentSection(section.get(2))}
          />
        )
      case section.get(2):
        return (
          <TargetUser
            targetUser={event.targetUser}
            onChangeTargetUser={changeTargetUser}
            onClickNext={() => setCurrentSection(section.get(3))}
          />
        )
      case section.get(3):
        return (
          <EventFee
            eventFee={event.eventFee}
            onChangeEventFee={changeEventFee}
            onClickNext={() => setCurrentSection(section.get(4))}
          />
        )
      case section.get(4):
        return (
          <NumberOfPeople
            numberOfPeople={event.recruitPeopleCount}
            onChangeNumberOfPeople={changeRecruitPeopleCount}
            onClickNext={() => setCurrentSection(section.get(5))}
          />
        )
      case section.get(5):
        return (
          <EventDate
            startAt={event.startAt}
            endAt={event.endAt}
            onChangeStartAt={changeStartAt}
            onChangeEndAt={changeEndAt}
            onClickNext={() => setCurrentSection(section.get(6))}
          />
        )
      case section.get(6):
        return (
          <EventPlace
            region={region}
            onChangeRegion={clickRegion}
            onClickNext={() => setCurrentSection(section.get(7))}
          />
        )
      case section.get(7):
        return (
          <EventPlaceDetail
            prefectures={prefectures}
            onChangePrefecture={clickPrefecture}
            selectedPrefecture={event.prefecture}
            onClickNext={() => setCurrentSection(section.get(8))}
          />
        )
      case section.get(8):
        return (
          <EventImage
            imageUrls={event.imageUrls}
            onClickFileUpload={clickUploadImage}
            onClickNext={() => clickNextToDescription()}
          />
        )
      case section.get(9):
        return (
          <EventDescription
            description={event.description}
            onChangeDescription={changeDescription}
            onClickNext={() => setCurrentSection(section.get(10))}
          />
        )
      case section.get(10):
        return (
          <EventConfirmation
            event={event}
            onClickSubmit={publishEvent}
            onChangeMovieLink={changeMovieLink}
            onChangeSnsLink={changeSnsLink}
          />
        )
      default:
        return null
    }
  }
  return (
    <div
      style={{
        backgroundColor: '#F1F1F1',
        height: '100vh',
      }}
    >
      {renderComponent()}
    </div>
  )
}

export default Page
