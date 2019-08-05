import firebase, { firestore } from 'firebase/app'

export const interviewCollection = () => firestore().collection('interviews')

export const userInterviewCollection = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`interviews`)

export const toModel = (id: string, data: firebase.firestore.DocumentData) => {
  const createdAt = data.createdAt
    ? data.createdAt.toDate().getTime()
    : undefined
  const updatedAt = data.updatedAt
    ? data.updatedAt.toDate().getTime()
    : undefined
  return {
    id,
    nickname: data.nickname,
    contents: data.contents,
    profileImageUrl: data.profileImageUrl,
    createdAt,
    updatedAt,
  }
}
