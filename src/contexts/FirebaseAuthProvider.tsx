import * as React from 'react'
import { User } from '@src/types'
import { useFirebaseAuth } from '@src/hooks/useFirebaseAuth'
import 'firebase/auth'
import 'firebase/firestore'

export const FirebaseAuthContext = React.createContext<{
  user?: User | null
}>({})

const FirebaseAuthProvider: React.FC<{}> = ({ children }) => {
  return (
    <FirebaseAuthContext.Provider
      value={{
        user: useFirebaseAuth(),
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export default FirebaseAuthProvider
