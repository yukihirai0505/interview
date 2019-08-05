import * as React from 'react'
import Layout from '../../components/Layout'
import { useFirestoreInterview } from '@src/hooks/useFirestoreInterviews'
import BlogLayout from '@src/components/blog/BlogLayout'
import { CommonBlogContent } from '@src/components/blog/BlogContent'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'
import { BlogPostCaptchaImage } from '@src/templates/blog-post'
import { OGP } from '@src/components/OpenGraphProtocol'

export default () => {
  const user = useFirebaseUser()
  const fictionId = document.location.pathname.replace('/fiction/', '')
  const interview = useFirestoreInterview(fictionId)
  if (!interview) {
    return <p>ローディング中</p>
  }
  const nickname = `${interview && interview.nickname}`
  const title = `${nickname}に突撃インタビュー`
  console.log(interview.contents)
  const content = (
    <CommonBlogContent
      intro={
        <p>
          本日はいま
          <b className="text-yellow-line">SNSで人気を集めている</b>
          このお方！<b>{nickname}</b>
          さんをお呼びしてインタビューしていきたいと思います。
          ということでさっそくこの方に登場願いましょう。
        </p>
      }
      nickname={nickname}
      isDog={false}
      icon={{ src: interview.profileImageUrl }}
      contents={interview.contents}
    />
  )
  return (
    <Layout isWebsite={false} user={user}>
      <div className="featured-thumbnail">
        <BlogPostCaptchaImage
          imageInfo={{
            image: {
              src:
                'https://firebasestorage.googleapis.com/v0/b/plz-pr-me.appspot.com/o/template-image-0.png?alt=media&token=f6f69405-4fc7-4e69-b83b-81ec5a7927b6',
            },
            alt: `featured image thumbnail for post ${title}`,
          }}
        />
      </div>
      <BlogLayout
        helmet={
          <OGP
            title={title}
            description={title}
            url={document.URL}
            imageUrl={`https://firebasestorage.googleapis.com/v0/b/plz-pr-me.appspot.com/o/template-image-0.png?alt=media&token=f6f69405-4fc7-4e69-b83b-81ec5a7927b6`}
          />
        }
        title={title}
        subTitle={'SNSで超話題！'}
        nickname={nickname}
        date={new Date().toLocaleDateString()}
        content={content}
        url={document.URL}
      />
    </Layout>
  )
}
