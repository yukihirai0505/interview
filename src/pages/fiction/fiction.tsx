import * as React from 'react'
import Layout from '../../components/Layout'
// import { useFirestoreInterview } from '@src/hooks/useFirestoreInterviews'
import BlogLayout from '@src/components/blog/BlogLayout'
import { BlogContent } from '@src/components/blog/BlogContent'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'
import { BlogPostCaptchaImage } from '@src/templates/blog-post'
import { OGP } from '@src/components/OpenGraphProtocol'
import { globalHistory } from '@reach/router'
import { useFirestoreInterview } from '@src/hooks/useFirestoreInterview'
import { getContentByTemplateKey } from '@src/components/templates'

export default () => {
  const user = useFirebaseUser()
  const fictionId = globalHistory.location.pathname.replace('/fiction/', '')
  const interview = useFirestoreInterview(fictionId)
  if (!interview) {
    return <p>ローディング中</p>
  }
  console.info(interview.contents)
  const template = getContentByTemplateKey(interview.nickname, Number(interview.templateKey))
  const content = (
    <BlogContent
      intro={template.intro}
      nickname={template.nickname}
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
              src: template.imageUrl,
            },
            alt: `featured image thumbnail for post ${template.title}`,
          }}
        />
      </div>
      <BlogLayout
        helmet={
          <OGP
            title={template.title}
            description={template.title}
            url={globalHistory.location.href}
            imageUrl={template.imageUrl}
          />
        }
        title={template.title}
        subTitle={template.subTitle}
        nickname={template.nickname}
        date={new Date().toLocaleDateString()}
        content={content}
        url={globalHistory.location.href}
      />
    </Layout>
  )
}
