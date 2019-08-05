import firebase from 'firebase/app'
import {
  interviewCollection,
  userInterviewCollection,
} from '@src/firestore/Interview'
import { UserContent } from '@src/types'

export const addInterview = async (
  uid: string,
  nickname: string,
  profileImageUrl: string,
  contents: UserContent[]
): Promise<string> => {
  const interviewResult = await interviewCollection().add({
    nickname,
    profileImageUrl,
    contents,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  await userInterviewCollection(uid).add({
    interviewId: interviewResult.id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  // .catch(error => {
  //   console.error('Error add interview to Firebase Database', error)
  // })
  return interviewResult.id
}
