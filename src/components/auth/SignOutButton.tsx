import * as React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { navigate } from 'gatsby'

const SignOutButton = () => {
  const onClickHandler = () => {
    firebase.auth().signOut()
    navigate('/')
  }

  return (
    <button className="button is-primary" onClick={onClickHandler}>
      ログアウト
    </button>
  )
}

export default SignOutButton
