import React from 'react'
import { TwitterShareButton, TwitterIcon } from 'react-share'

export default ({
  helmet,
  title,
  subTitle,
  nickname,
  url,
  date,
  twitterAccountName,
  content,
}: {
  helmet?: object
  title: string
  subTitle: string
  nickname: string
  url?: string
  date: string
  twitterAccountName?: string
  content: object
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column blog-post-content-wrapper">
            <span className="blog-post-sub-title text-yellow-line">
              {subTitle}
            </span>
            <h1
              className="title is-size-2 has-text-weight-bold is-bold-light"
              style={{ marginTop: 12 }}
            >
              {title}
            </h1>
            <div style={{ marginBottom: '1.2em' }}>
              <span className="pr-icon">#ステマ！</span>{' '}
              <span className="pr-icon">#PR</span>
            </div>
            <p>{date}</p>
            <p style={{ fontWeight: 700 }}>
              取材協力:{' '}
              {twitterAccountName ? (
                <a href={`https://twitter.com/${twitterAccountName}`}>
                  {nickname}さん(@{twitterAccountName})
                </a>
              ) : (
                `${nickname}さん`
              )}
            </p>
            {content}
            {url && (
              <div style={{ padding: '36px 20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TwitterShareButton title={title} via="plzprme" url={url}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
