import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { User } from '@src/types'

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.info(user)
        console.info(`firebase: authorized (uid: ${user.uid})`)
        const userName = user.displayName ? user.displayName : '名無し'
        const twitterInfo = user.providerData[0] ? user.providerData[0] : {}
        setUser({ uid: user.uid, name: userName, twitterInfo: twitterInfo })
      } else {
        console.info(`firebase: unauthorized`)
        setUser(null)
      }
    })

    return () => {
      console.info(`firebase: unsubscribe onAuthStateChanged`)
      unsubscribe()
    }
  }, [])

  return user
}
