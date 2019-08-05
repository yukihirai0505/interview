import React, { Fragment } from 'react'
import CommentItem from './CommentItem'
import { CoverImageOriginal } from '@src/types'

export default ({
  intro,
  nickname,
  icon,
  selfIntroduction,
  isDog,
}: {
  intro?: JSX.Element
  nickname: string
  icon: CoverImageOriginal
  selfIntroduction?: string
  isDog: boolean
}) => {
  return (
    <Fragment>
      {intro}
      {isDog ? (
        <CommentItem
          comment={`キャンッ！`}
          nickname={nickname}
          icon={icon}
          isNormal={true}
        />
      ) : (
        <CommentItem
          comment={`どうも！${nickname}と申します。本日はよろしくお願いいたします！`}
          nickname={nickname}
          icon={icon}
          isNormal={true}
        />
      )}

      <CommentItem
        comment={`本日は貴重なお時間ありがとうございます！どうぞよろしくお願いいたします！`}
      />
      {selfIntroduction && (
        <div>
          <CommentItem
            comment={`それではまず簡単な自己紹介からお願いできますでしょうか？`}
          />
          <CommentItem
            comment={selfIntroduction}
            nickname={nickname}
            icon={icon}
            isNormal={true}
          />
          <CommentItem
            comment={`なるほどー！ありがとうございます！${
              isDog ? '(ちょっと何言ってるかわからない...)' : ''
            }`}
          />
        </div>
      )}
    </Fragment>
  )
}
