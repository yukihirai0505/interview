import * as React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { navigate } from 'gatsby'

export default () => {
  const onClickHandler = () => {
    const user = firebase.auth().currentUser
    if (user) {
      navigate('/')
    } else {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    }
  }
  return (
    <button className="button is-primary" onClick={onClickHandler}>
      取材されたい！
    </button>
  )
}
