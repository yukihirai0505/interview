import { useEffect, useState } from 'react'
import { Interview } from '@src/types'
import { interviewCollection, toModel } from '@src/firestore/Interview'

export const useFirestoreInterview = (interviewId: string) => {
  const [interview, setInterview] = useState<Interview>()
  useEffect(() => {
    const unsubscribe = interviewCollection()
      .doc(interviewId)
      .onSnapshot(snapshot => {
        const interview = toModel(snapshot.id, snapshot.data()!)
        setInterview(interview)
      })
    return () => {
      console.info(`firestore: unsubscribe onSnapshot:interview`)
      unsubscribe()
    }
  }, [interviewId])
  return interview
}
