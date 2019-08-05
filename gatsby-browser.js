/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import wrapWithProvider from './wrap-with-provider'
import firebase from 'firebase/app'

export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
  const config = {
    apiKey: 'AIzaSyCQ2xAY92K_zQ4JapaJ9HYK667svRN5VAU',
    authDomain: 'plz-pr-me.firebaseapp.com',
    databaseURL: 'https://plz-pr-me.firebaseio.com',
    projectId: 'plz-pr-me',
    storageBucket: 'gs://plz-pr-me.appspot.com/',
    messagingSenderId: '246811620192',
    appId: '1:246811620192:web:5bf02cd26d818169',
  }
  firebase.initializeApp(config)
}
