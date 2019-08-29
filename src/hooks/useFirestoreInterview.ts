import { useContext } from 'react'
import { FirebaseAuthContext } from '@src/contexts/FirebaseAuthProvider'

export const userFirestoreInterview = () =>
  useContext(FirebaseAuthContext).interview
