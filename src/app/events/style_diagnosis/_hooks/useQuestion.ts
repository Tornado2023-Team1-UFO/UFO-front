import { useState } from 'react'
import { Question, defaultQuestions } from '../_constants/question'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export const useQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions)
  const [currentQuestionId, setCurrentQuestionId] = useState(1)
  const router = useRouter()

  const lastQuestionId = questions.length
  const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const clickAnswer = async (point: 0 | 1) => {
    if (currentQuestionId === lastQuestionId) {
      const type = findPersornalizedEvent(point)
      toast.success('あなたにぴったりのイベントを見つけました！')

      await _sleep(1000)
      router.push('/events/swipe?type=' + type)
    }

    const newQuestions = questions.map((question) => {
      if (question.id === currentQuestionId) {
        question.point = point
      }
      return question
    })
    setQuestions(newQuestions)
    setCurrentQuestionId(currentQuestionId + 1)
  }

  const findPersornalizedEvent = (lastPoint: 0 | 1): 'a' | 'b' | 'c' | 'd' => {
    const sumPoints =
      questions.reduce((sum, question) => {
        return sum + question.point
      }, 0) + lastPoint

    switch (sumPoints) {
      case 0:
        return 'c'
      case 1:
        return 'd'
      case 2:
        return 'b'
      case 3:
        return 'a'
      case 4:
        return 'd'
      default:
        return 'a'
    }
  }

  const currentQuestion = questions.find((question) => question.id === currentQuestionId)
  return {
    clickAnswer,
    currentQuestion,
  }
}
