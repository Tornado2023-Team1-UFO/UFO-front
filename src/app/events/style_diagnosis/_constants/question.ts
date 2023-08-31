export type Question = {
  id: number
  question: string
  choices: {
    choice1: string
    choice2: string
  }
  point: 0 | 1
}

export const question1: Question = {
  id: 1,
  question: '週末の過ごし方は？',
  choices: {
    choice1: 'アウトドアで自然を満喫',
    choice2: '室内でリラックス',
  },
  point: 0,
}

export const question2: Question = {
  id: 2,
  question: 'どっちの活動が好き？',
  choices: {
    choice1: 'アクティブに運動',
    choice2: 'クリエイティブな活動',
  },
  point: 0,
}

export const question3: Question = {
  id: 3,
  question: 'どっちの気分？',
  choices: {
    choice1: '遊び倒したい！',
    choice2: 'コツコツ取り組みたい',
  },
  point: 0,
}

export const question4: Question = {
  id: 4,
  question: 'どっちのイベントの 雰囲気が理想的？',
  choices: {
    choice1: '大人数でワイワイ',
    choice2: '少人数でアットホーム',
  },
  point: 0,
}

export const defaultQuestions = [question1, question2, question3, question4]
