import { FC } from 'react'
import { Event, Return } from '../_hooks/useEventCreate'

type Props = {
  event: Event
  returns: Return[]
  onChangeSnsLink: (snsLink: string) => void
  onChangeMovieLink: (movieLink: string) => void
  onClickSubmit: () => void
  addReturn: () => void
}

import styles from './eventConfirmation.module.css'
import { Title } from './common/Title'

export const EventConfirmation: FC<Props> = ({
  addReturn,
  returns,
  event,
  onChangeSnsLink,
  onChangeMovieLink,
  onClickSubmit,
}) => {
  const imageUrls = event.imageUrls
  if (imageUrls.length <= 4) {
    for (let i = 0; i <= 10 - imageUrls.length; i++) {
      imageUrls.push('')
    }
  }

  return (
    <div className={styles.container}>
      <Title title='イベントの編集' />
      <div className={styles.slider_wrapper}>
        <div className={styles.image_container}>
          {event.imageUrls.map((imageUrl) =>
            imageUrl === '' ? (
              <div
                className={styles.image}
                style={{
                  backgroundColor: '#9b9b9b9b',
                }}
              ></div>
            ) : (
              <img src={imageUrl} alt='event' />
            ),
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <Title title='イベントの詳細' />
          <hr className={styles.hr} />
        </div>
        <div>
          <div className={styles.input_container}>
            <Title title='開催地域' />
            <input
              type='text'
              value={event.prefecture}
              placeholder='必須'
              style={{
                width: '72px',
              }}
            />
          </div>
          <hr className={styles.hr} />
        </div>
        <div>
          <div className={styles.input_container}>
            <Title title='開催日(開始）' />
            <input type='date' value={event.startAt} />
          </div>
          <hr className={styles.hr} />
        </div>
        <div>
          <div className={styles.input_container}>
            <Title title='開催日(終了)' />
            <input type='date' value={event.endAt} />
          </div>
          <hr className={styles.hr} />
        </div>
      </div>
      <div className={styles.input_title_container}>
        <h1 className={styles.input_title_label}>イベントタイトル</h1>
        <input className={styles.input_title} type='text' value={event.title} placeholder='必須' />
      </div>
      <div className={styles.input_title_container}>
        <h1 className={styles.input_title_label}>説明（任意）</h1>
        <textarea className={styles.description} value={event.description} />
      </div>
      <div>
        <hr />
      </div>
      <div className={styles.sub_input_container}>
        <hr className={styles.hr_sub} />
        <div className={styles.sub_input}>
          <h1 className={styles.input_title_label}>一人あたりの参加費</h1>
          <input className={styles.sub_inputs} type='text' value={event.eventFee} placeholder='0円' />
        </div>
      </div>
      <div className={styles.sub_input_container}>
        <hr className={styles.hr_sub} />
        <div className={styles.sub_input}>
          <h1 className={styles.input_title_label}>目標人数</h1>
          <input className={styles.sub_inputs} type='text' value={event.recruitPeopleCount} placeholder='0円' />
        </div>
      </div>
      <div className={styles.sub_input_container}>
        <hr className={styles.hr_sub} />
        <div className={styles.sub_input}>
          <h1 className={styles.input_title_label}>SNSリンク</h1>
          <input className={styles.sub_inputs} type='text' value={event.snsLink} placeholder='任意' />
        </div>
      </div>
      <div className={styles.sub_input_container}>
        <hr className={styles.hr_sub} />
        <div className={styles.sub_input}>
          <h1 className={styles.input_title_label}>動画リンク</h1>
          <input className={styles.sub_inputs} type='text' value={event.movieLink} placeholder='任意' />
        </div>
      </div>

      {returns.map((r) => {
        return (
          <>
            <div className={styles.sub_input_container}>
              <hr className={styles.hr_sub} />
              <div className={styles.sub_input}>
                <h1 className={styles.input_title_label}>リターン金額(任意）</h1>
                <input
                  className={styles.sub_inputs}
                  type='text'
                  value={r.amount}
                  placeholder='任意'
                  onChange={(e) => onChangeSnsLink(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.sub_input_container}>
              <hr className={styles.hr_sub} />
              <div className={styles.sub_input}>
                <h1 className={styles.input_title_label}>リターン内容（任意）</h1>
              </div>
              <textarea className={styles.description} value={r.content} />
            </div>
          </>
        )
      })}

      <button className={styles.return_button} onClick={() => addReturn()}>
        <h1>リターンを追加する</h1>
      </button>

      <div className={styles.submit_container}>
        <button className={styles.submit_button} onClick={() => onClickSubmit()}>
          公開する
        </button>
      </div>
    </div>
  )
}
