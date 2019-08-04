import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Fragment } from 'react'
import { Link } from 'gatsby'

const Comment = ({
  comment,
  nickname = '凄腕インタビュアー',
  icon = '/img/interviewer.png',
  isNormal = false,
}) => {
  return (
    <div className={`comment ${isNormal ? 'normal' : 'reverse'}`}>
      <div>
        <picture>
          <img src={icon} alt={nickname} />
        </picture>
      </div>
      <div className="comment-content">
        <p className="comment-name">{nickname}</p>
        <div className="comment-text-wrapper">
          <p className="comment-text">
            {comment.split('\\n').map(item => {
              return (
                <Fragment>
                  {item}
                  <br />
                </Fragment>
              )
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.string,
  nickname: PropTypes.string,
  icon: PropTypes.string,
  isNormal: PropTypes.bool,
}

const CommonContent = ({
  intro,
  selfIntroduction,
  nickname,
  icon,
  contents,
}) => {
  return (
    <div>
      {intro}
      <Comment
        comment={`どうも！${nickname}と申します。本日はよろしくお願いいたします！`}
        nickname={nickname}
        icon={icon}
        isNormal={true}
      />
      <Comment
        comment={`本日は貴重なお時間ありがとうございます！どうぞよろしくお願いいたします！`}
      />
      {selfIntroduction && (
        <div>
          <Comment
            comment={`それではまず簡単な自己紹介からお願いできますでしょうか？`}
          />
          <Comment
            comment={selfIntroduction}
            nickname={nickname}
            icon={icon}
            isNormal={true}
          />
          <Comment comment={`なるほどー！ありがとうございます！`} />
        </div>
      )}
      {contents.map(({ question, answer, imagePath, imageDescription }) => {
        return (
          <div>
            <Comment comment={question} />
            <Comment
              comment={answer}
              nickname={nickname}
              icon={icon}
              isNormal={true}
            />
            {imagePath ? (
              <div className="image-item">
                <figure>
                  <div className="image">
                    <Img
                      fluid={imagePath.childImageSharp.fluid}
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
          </div>
        )
      })}
      <Comment
        comment={`${nickname}さん！本日はお忙しい中取材のお時間ありがとうございました！ぜひ、また取材させてくださいね！`}
      />
      <Comment
        comment={`いえ！こちらこそ楽しかったです！ありがとうございました！`}
        nickname={nickname}
        icon={icon}
        isNormal={true}
      />
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
        興味のある方はいつでもお問い合わせください！
        <br />
        こちらのフォームから簡単に取材記事を投稿することができます。
        <br />
        <br />
        <a href={'https://forms.gle/twhjDuw32mEJZwz77'}>→【Googleフォーム】</a>
        <br />
        <br />
        最後までお読みいただきましてありがとうございました！
      </p>
    </div>
  )
}

CommonContent.propTypes = {
  intro: PropTypes.element,
  nickname: PropTypes.string,
  icon: PropTypes.string,
  contents: PropTypes.array,
}

export const NormalContent = ({
  selfIntroduction,
  nickname,
  icon,
  contents,
}) => {
  return (
    <CommonContent
      intro={
        <p>
          本日はいま<b className="text-yellow-line">日本中が熱狂して止まない</b>
          このお方！<b>{nickname}</b>
          さんをお呼びしてインタビューしていきたいと思います。
          ということでさっそくこの方に登場願いましょう。
        </p>
      }
      selfIntroduction={selfIntroduction}
      nickname={nickname}
      icon={icon}
      contents={contents}
    />
  )
}

NormalContent.propTypes = {
  nickname: PropTypes.string,
  icon: PropTypes.string,
  contents: PropTypes.array,
}

export const IndividualDeveloperContent = ({
  serviceName,
  selfIntroduction,
  nickname,
  icon,
  contents,
}) => {
  return (
    <CommonContent
      intro={
        <p>
          本日はいま話題沸騰中のサービス
          <b className="text-yellow-line">「{serviceName}」</b>
          を開発した<b>{nickname}</b>
          さんをお呼びしてインタビューしていきたいと思います。
          ということでさっそくこの方に登場願いましょう。
        </p>
      }
      selfIntroduction={selfIntroduction}
      nickname={nickname}
      icon={icon}
      contents={contents}
    />
  )
}

IndividualDeveloperContent.propTypes = {
  serviceName: PropTypes.string,
  nickname: PropTypes.string,
  icon: PropTypes.string,
  contents: PropTypes.array,
}
