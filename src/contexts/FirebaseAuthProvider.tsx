import * as React from 'react'
import { User, Interview } from '@src/types'
import { useFirebaseAuth } from '@src/hooks/useFirebaseAuth'
import 'firebase/auth'
import 'firebase/firestore'
import { useFirestoreInterview } from '@src/hooks/useFirestoreInterviews'
import { globalHistory } from '@reach/router'

export const FirebaseAuthContext = React.createContext<{
  user?: User | null
  interview?: Interview | null
}>({})

const FirebaseAuthProvider: React.FC<{}> = ({ children }) => {
  const currentPath = globalHistory.location.pathname
  const isFictionPage = currentPath.includes('fiction')
  const fictionId = isFictionPage ? currentPath.replace('/fiction/', '') : ''
  return (
    <FirebaseAuthContext.Provider
      value={{
        user: useFirebaseAuth(),
        interview: isFictionPage ? useFirestoreInterview(fictionId) : null,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export default FirebaseAuthProvider
