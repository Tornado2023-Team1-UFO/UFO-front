'use client'

import { RedirectToSignIn, useAuth } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { Question } from './_components/Question'
import { useQuestion } from './_hooks/useQuestion'

export default function Page() {
  const { userId } = useAuth()
  const { clickAnswer, currentQuestion } = useQuestion()
  if (!userId) {
    toast.error('スタイル診断をするにはログインが必要です。')
    return <RedirectToSignIn />
  }

  if (!currentQuestion) return null
  return (
    <Question
      questionId={currentQuestion.id}
      choice1={currentQuestion.choices.choice1}
      choice2={currentQuestion.choices.choice2}
      title={currentQuestion.question}
      onClickAnswer={clickAnswer}
    />
  )
}
