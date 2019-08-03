import React from 'react'
import PropTypes from 'prop-types'

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
          <p className="comment-text">{comment}</p>
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

const CommonContent = ({ intro, nickname, icon, contents }) => {
  console.info(contents)
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
            {imagePath ? <div>{imageDescription}</div> : null}
          </div>
        )
      })}
    </div>
  )
}

CommonContent.propTypes = {
  intro: PropTypes.element,
  nickname: PropTypes.string,
  icon: PropTypes.string,
  contents: PropTypes.array,
}

export const NormalContent = ({ nickname, icon, contents }) => {
  return (
    <CommonContent
      intro={
        <p>
          本日はいま日本中が熱狂して止まないこのお方！<b>{nickname}</b>
          さんをお呼びしてインタビューしていきたいと思います。
          ということでさっそくこの方に登場願いましょう。
        </p>
      }
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
  nickname,
  icon,
  contents,
}) => {
  return (
    <CommonContent
      intro={
        <p>
          本日はいま話題沸騰中のサービス<b>「{serviceName}」</b>
          を開発した<b>{nickname}</b>
          さんをお呼びしてインタビューしていきたいと思います。
          ということでさっそくこの方に登場願いましょう。
        </p>
      }
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
