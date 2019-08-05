import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import { CommentItem } from './types'

export default ({
  comment,
  nickname = '凄腕インタビュアー',
  icon,
  isNormal = false,
  editable = false,
}: CommentItem) => {
  return (
    <div className={`comment ${isNormal ? 'normal' : 'reverse'}`}>
      <div>
        <picture>
          {icon && icon.src ? (
            <img src={icon.src} alt={nickname} />
          ) : icon && icon.childImageSharp ? (
            <Img fixed={icon.childImageSharp.fixed} alt={nickname} />
          ) : (
            <img src="/img/interviewer.png" alt={nickname} />
          )}
        </picture>
      </div>
      <div className="comment-content">
        <p className="comment-name">{nickname}</p>
        <div className="comment-text-wrapper">
          <p className="comment-text" contentEditable={editable}>
            {comment.split('\\n').map((item, key) => {
              return (
                <Fragment key={key}>
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
