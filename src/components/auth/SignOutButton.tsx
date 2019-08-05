import * as React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const SignOutButton = () => {
  const onClickHandler = () => {
    firebase.auth().signOut()
  }

  return (
    <button className="button is-primary" onClick={onClickHandler}>
      ログアウト
    </button>
  )
}

export default SignOutButton
