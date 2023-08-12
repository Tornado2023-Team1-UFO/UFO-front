import axios from 'axios'

const url = process.env.NEXT_PUBLIC_WEB_URL

if (!url) {
  throw new Error('URLが設定されていません。')
}

export const nextApi = axios.create({
  baseURL: `${url}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})
