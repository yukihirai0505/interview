import React from 'react'
import Layout from '../../components/Layout'
import BlogLayout from '@src/components/blog/BlogLayout'
import { BlogContent } from '@src/components/blog/BlogContent'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'
import { BlogPostCaptchaImage } from '@src/templates/blog-post'
import { getContentByTemplateKey } from '@src/components/templates'

export default () => {
  const user = useFirebaseUser()
  if (user) {
    const userInfo = user.twitterInfo
    const profileUrl = userInfo.photoURL.replace('_normal', '')
    const templateKey = new URL(location.href).searchParams.get('templateKey')
    const _nickname = `${userInfo.displayName}`
    const template = getContentByTemplateKey(_nickname, Number(templateKey))
    const content = (
      <BlogContent
        intro={template.intro}
        nickname={template.nickname}
        icon={{ src: profileUrl }}
        contents={template.contents}
        editable={true}
        templateKey={Number(templateKey)}
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
          title={template.title}
          subTitle={template.subTitle}
          nickname={template.nickname}
          date={new Date().toLocaleDateString()}
          content={content}
        />
      </Layout>
    )
  }
  return <p>ローディング中</p>
}
