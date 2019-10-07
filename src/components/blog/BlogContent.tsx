import React from 'react'
import Img from 'gatsby-image'
import { navigate } from 'gatsby'
import { CoverImageOriginal, UserContent } from '@src/types'
import CommentItem from './CommentItem'
import { Fragment } from 'react'
import firebase from 'firebase/app'
import { addInterview } from '@src/actions/InterviewAction'
import TwitterAuthButton from '../auth/TwitterAuthButton'

interface BlogContent {
  intro?: JSX.Element
  templateKey?: number
  nickname: string
  icon: CoverImageOriginal
  contents: UserContent[]
  editable?: boolean
}

const savePhoto = async (user: firebase.User) => {
  const url = user!.providerData[0]!.photoURL!.replace('_normal', '')
  const response = await fetch(url)
  const blob = await response.blob()
  const userId = user!.uid
  const picRef = firebase.storage().ref(userId + '/profilePhoto')
  await picRef.put(blob)
  const uploaded = await picRef.getDownloadURL()
  return uploaded
}

const saveContent = async (templateKey: number) => {
  const user = firebase.auth().currentUser
  if (user) {
    const uploadedImage = await savePhoto(user)
    const contents: UserContent[] = Array.from(
      document && document.getElementsByClassName('comment')
    ).map(comment => {
      const isAnswer = comment.className.includes('normal')
      const commentText = comment.querySelector('.comment-text')!.textContent
      return isAnswer ? { answer: commentText } : { question: commentText }
    })
    const inteviewId = await addInterview(
      user.uid,
      `${user.displayName}`,
      uploadedImage,
      templateKey,
      contents
    )
    navigate(`/fiction/${inteviewId}`)
  }
}

export const BlogContent = ({
  intro,
  nickname,
  icon,
  contents,
  editable = false,
  templateKey = 0,
}: BlogContent) => {
  return (
    <div>
      {intro}
      {editable && (
        <p style={{ color: 'red' }} className={'has-text-centered'}>
          === ここから編集できます ===
        </p>
      )}
      {contents.map(
        ({ question, answer, imagePath, imageDescription }, key) => {
          return (
            <Fragment key={key}>
              {question && (
                <CommentItem comment={question} editable={editable} />
              )}
              {answer && (
                <CommentItem
                  comment={answer}
                  nickname={nickname}
                  icon={icon}
                  isNormal={true}
                  editable={editable}
                />
              )}
              {imagePath && imagePath.childImageSharp ? (
                <div className="image-item">
                  <figure>
                    <div className="image">
                      <Img
                        fluid={imagePath!.childImageSharp!.fluid}
                        alt={imageDescription}
                      />
                    </div>
                    <div className="image-description">
                      <figcaption>
                        <p>{imageDescription}</p>
                      </figcaption>
                    </div>
                  </figure>
                </div>
              ) : null}
            </Fragment>
          )
        }
      )}
      {editable && (
        <p style={{ color: 'red' }} className={'has-text-centered'}>
          === ここまで編集できます ===
        </p>
      )}
      {editable ? (
        <div className="has-text-centered">
          <button
            className="button is-primary"
            onClick={() => saveContent(templateKey)}
          >
            保存する
          </button>
        </div>
      ) : (
        <p style={{ marginTop: '20px' }}>
          {nickname}
          さんのお話はとてもユニークで面白かったですね！
          <br />
          <br />
          いまこの記事を読んでいる
          <b className="text-yellow-line">あなたも次は取材を受ける側</b>
          になってみませんか？
          <br />
          <br />
          こちらのサイトでは随時、取材を受け付けております！
          <br />
          Twitter連携するだけでお手軽に取材記事を作成することができます。
          <br />
          <br />
          <div className={'has-text-centered'}>
            <TwitterAuthButton />
          </div>
          <br />
          <br />
          最後までお読みいただきましてありがとうございました！
        </p>
      )}
    </div>
  )
}
