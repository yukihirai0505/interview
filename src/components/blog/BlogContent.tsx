import React from 'react'
import Img from 'gatsby-image'
import { navigate } from 'gatsby'
import { CoverImageOriginal, UserContent } from '@src/types'
import CommentItem from './CommentItem'
import addLastMessage from './LastMessage'
import Intro from './Intro'
import { Fragment } from 'react'
import firebase from 'firebase/app'
import { addInterview } from '@src/actions/InterviewAction'
import TwitterAuthButton from '../auth/TwitterAuthButton'

interface BaseBlogContent {
  isDog: boolean
  selfIntroduction?: string
  nickname: string
  icon: CoverImageOriginal
  contents: UserContent[]
  editable?: boolean
}

interface CommonBlogContent extends BaseBlogContent {
  intro?: JSX.Element
}

interface ServiceContent extends BaseBlogContent {
  serviceName: string
  serviceURL: string
}

const savePhoto = async (user: firebase.User) => {
  var url = user!.providerData[0]!.photoURL!.replace('_normal', '')
  var response = await fetch(url)
  var blob = await response.blob()
  var userId = user!.uid
  var picRef = firebase.storage().ref(userId + '/profilePhoto')
  var snapshot = await picRef.put(blob)
  var uploaded = await picRef.getDownloadURL()
  return uploaded
}

const saveContent = async () => {
  var user = firebase.auth().currentUser
  if (user) {
    const uploadedImage = await savePhoto(user)
    const comments = Array.from(
      document && document.getElementsByClassName('comment-text')
    ).map(comment => {
      return comment.textContent
    })
    let rest: UserContent[] = []
    for (let i = 0; i < comments.length - 3; i = i + 2) {
      const index = 2 + i
      rest.push({ question: comments[index]!, answer: comments[index + 1]! })
    }
    const contents: UserContent[] = [
      {
        answer: comments[0]!,
      },
      {
        question: comments[1]!,
      },
      ...rest,
      {
        question: comments.slice(-1)[0]!,
      },
    ]
    const inteviewId = await addInterview(
      user.uid,
      `${user.displayName}汁王子`,
      uploadedImage,
      contents
    )
    navigate(`/fiction/${inteviewId}`)
  }
}

export const CommonBlogContent = ({
  intro,
  nickname,
  icon,
  contents,
  editable = false,
}: CommonBlogContent) => {
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
          <button className="button is-primary" onClick={saveContent}>
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

export const NormalContent = ({
  selfIntroduction,
  nickname,
  isDog,
  icon,
  contents,
  editable = false,
}: CommonBlogContent) => {
  return (
    <CommonBlogContent
      intro={
        <Intro
          intro={
            <p>
              本日はいま
              <b className="text-yellow-line">日本中が熱狂して止まない</b>
              このお方！<b>{nickname}</b>
              さんをお呼びしてインタビューしていきたいと思います。
              ということでさっそくこの方に登場願いましょう。
            </p>
          }
          nickname={nickname}
          icon={icon}
          selfIntroduction={selfIntroduction}
          isDog={isDog}
        />
      }
      nickname={nickname}
      icon={icon}
      contents={addLastMessage({ contents, nickname, isDog })}
      editable={editable}
      isDog={isDog}
    />
  )
}

export const ServiceContent = ({
  serviceName,
  serviceURL,
  selfIntroduction,
  nickname,
  isDog,
  icon,
  contents,
}: ServiceContent) => {
  return (
    <CommonBlogContent
      intro={
        <Intro
          intro={
            <p>
              本日はいま話題沸騰中のサービス
              <b className="text-yellow-line">
                「{<a href={serviceURL}>{serviceName}</a>}」
              </b>
              を開発した<b>{nickname}</b>
              さんをお呼びしてインタビューしていきたいと思います。
              ということでさっそくこの方に登場願いましょう。
            </p>
          }
          nickname={nickname}
          icon={icon}
          selfIntroduction={selfIntroduction}
          isDog={isDog}
        />
      }
      selfIntroduction={selfIntroduction}
      nickname={nickname}
      isDog={isDog}
      icon={icon}
      contents={addLastMessage({ contents, nickname, isDog })}
    />
  )
}
