import { Configuration, OpenAIApi } from 'openai'

// 発行したAPI Keyを使って設定を定義
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)
