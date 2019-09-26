import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import {
  userInterviewCollection,
  toModel,
} from '@src/firestore/Interview'
import { Interview, VisibilityFilter } from '@src/types'

export const useFirestoreInterviews = (
  uid: string,
  filter: VisibilityFilter
) => {
  const [interviews, setInterviews] = useState<Interview[]>()
  useEffect(() => {
    const collection = userInterviewCollection(uid)
    let query: firebase.firestore.Query = collection.orderBy(
      `createdAt`,
      `desc`
    )
    const unsubscribe = query.onSnapshot(snapshot => {
      console.info(
        `firestore: receive interviews: size=${snapshot.docs.length}`
      )
      const interviews = snapshot.docs.map(doc => toModel(doc.id, doc.data()))
      setInterviews(interviews)
    })
    return () => {
      console.info(`firestore: unsubscribe onSnapshot:interview`)
      unsubscribe()
    }
  }, [filter])
  return interviews
}
