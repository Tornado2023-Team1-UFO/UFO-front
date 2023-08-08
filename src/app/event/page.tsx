'use client'

import { NavigationMenu } from './_components/NavigationMenu'
import styles from './event.module.css'
import { FaHeart, FaLink, FaUser } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Virtual } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/virtual'

const EventPage = () => {
  return (
    <Swiper modules={[Virtual]} virtual>
      <SwiperSlide virtualIndex={1}>
        <div
          className={styles.full}
          style={{ backgroundImage: `url("https://pbs.twimg.com/media/FUJpxo1aIAAJhAt.jpg")` }}
        >
          <div className={styles.items}>
            <div>
              <FaUser className={styles.icon} />
              <p className={styles.text}>123</p>
            </div>
            <div>
              <FaHeart className={styles.icon} />
              <p className={styles.text}>123</p>
            </div>
            <div>
              <FaLink className={styles.icon} />
              <p className={styles.text}>共有</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide virtualIndex={2}>
        <div
          className={styles.full}
          style={{
            backgroundImage: `url("https://media.licdn.com/dms/image/D4E22AQE64qiIF0P7hg/feedshare-shrink_800/0/1687343003754?e=1693440000&v=beta&t=iU_qikJgJQT-fGAYvVRSIRu_FT7CBMAi0Iic1L2_TeM")`,
          }}
        >
          <div className={styles.items}>
            <div>
              <FaUser className={styles.icon} />
              <p className={styles.text}>123</p>
            </div>
            <div>
              <FaHeart className={styles.icon} />
              <p className={styles.text}>123</p>
            </div>
            <div>
              <FaLink className={styles.icon} />
              <p className={styles.text}>共有</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide virtualIndex={3}>
        <div
          className={styles.full}
          style={{
            backgroundImage: `url("https://miya-mari.net/cms-wp/wp-content/uploads/2022/10/d721b89848e0f21d5d5740a9dae94543.png")`,
          }}
        >
          <div className={styles.items}>
            <div>
              <FaUser className={styles.icon} />
              <p className={styles.text}>123</p>
            </div>
            <div>
              <FaHeart className={styles.icon} />
              <p className={styles.text}>123</p>
            </div>
            <div>
              <FaLink className={styles.icon} />
              <p className={styles.text}>共有</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <NavigationMenu />
    </Swiper>
  )
}

export default EventPage
