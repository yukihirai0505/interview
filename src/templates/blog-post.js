import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogLayout from '../components/blog/BlogLayout'
import Img from 'gatsby-image'
import { OGP } from '../components/OpenGraphProtocol'
import {
  BlogContent,
} from '../components/blog/BlogContent'
import { globalHistory } from '@reach/router'

export const BlogPostTemplate = ({
  helmet,
  date,
  url,
  title,
  subTitle,
  templateType,
  serviceName,
  serviceURL,
  nickname,
  icon,
  twitterAccountName,
  contents,
}) => {
  const content =
    templateType === 'normal' ? (
      <BlogContent
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
        contents={contents}
      />
    ) : templateType === 'individual-developer' ? (
      <BlogContent
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
        contents={contents}
      />
    ) : null
  return (
    <BlogLayout
      helmet={helmet}
      title={title}
      subTitle={subTitle}
      nickname={nickname}
      url={url}
      date={date}
      twitterAccountName={twitterAccountName}
      content={content}
    />
  )
}

BlogPostTemplate.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  helmet: PropTypes.object,
  templateType: PropTypes.string,
  serviceName: PropTypes.string,
  serviceURL: PropTypes.string,
  nickname: PropTypes.string,
  icon: PropTypes.object,
  contents: PropTypes.array,
}

export const BlogPostCaptchaImage = ({ imageInfo }) => {
  const { alt = '', image } = imageInfo
  return (
    <div>
      <div className="blog-post-background-captcha-image">
        {image.src ? (
          <img style={{ width: '100%' }} src={image.src} alt={alt} />
        ) : (
          <Img
            style={{ objectFit: 'cover', hegiht: '356px' }}
            fluid={image.childImageSharp.fluid}
            alt={alt}
          />
        )}
      </div>
      <div className="blog-post-captcha-image">
        {image.src ? (
          <img src={image.src} alt={alt} />
        ) : (
          <Img fluid={image.childImageSharp.fluid} alt={alt} />
        )}
      </div>
    </div>
  )
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  const articleTitle = post.frontmatter.title
  const articleUrl = `https://pr.yabaiwebyasan.com${globalHistory.location.pathname}`

  return (
    <Layout isWebsite={false}>
      <div className="featured-thumbnail">
        {post.frontmatter.captchaImage ? (
          <BlogPostCaptchaImage
            imageInfo={{
              image: post.frontmatter.captchaImage,
              alt: `featured image thumbnail for post ${post.title}`,
            }}
          />
        ) : null}
      </div>
      <BlogPostTemplate
        helmet={
          <OGP
            title={articleTitle}
            description={post.frontmatter.description}
            url={articleUrl}
            imageUrl={`https://pr.yabaiwebyasan.com${post.frontmatter.captchaImage.childImageSharp.fluid.src}`}
          />
        }
        date={post.frontmatter.date}
        url={articleTitle}
        title={articleTitle}
        subTitle={post.frontmatter.subTitle}
        templateType={post.frontmatter.templateType}
        serviceName={post.frontmatter.serviceName}
        serviceURL={post.frontmatter.serviceURL}
        nickname={post.frontmatter.nickname}
        icon={post.frontmatter.iconImage}
        twitterAccountName={post.frontmatter.twitterAccountName}
        contents={post.frontmatter.contents}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        subTitle
        templateKey
        date(formatString: "MMMM DD, YYYY")
        captchaImage {
          childImageSharp {
            fluid(maxWidth: 560, maxHeight: 294) {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
        templateType
        serviceName
        serviceURL
        contents {
          question
          answer
          imagePath {
            childImageSharp {
              fluid(maxWidth: 560) {
                src
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageDescription
        }
        nickname
        iconImage {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        twitterAccountName
      }
    }
  }
`
