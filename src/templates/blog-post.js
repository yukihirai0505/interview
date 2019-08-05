import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogLayout from '../components/blog/BlogLayout'
import Img from 'gatsby-image'
import { OGP } from '../components/OpenGraphProtocol'
import { NormalContent, ServiceContent } from '../components/blog/BlogContent'
import { globalHistory } from '@reach/router'

export const BlogPostTemplate = ({
  helmet,
  date,
  url,
  title,
  subTitle,
  selfIntroduction,
  templateType,
  isDog,
  serviceName,
  serviceURL,
  nickname,
  icon,
  twitterAccountName,
  contents,
}) => {
  const content =
    templateType === 'normal' ? (
      <NormalContent
        selfIntroduction={selfIntroduction}
        nickname={nickname}
        isDog={isDog}
        icon={icon}
        contents={contents}
      />
    ) : templateType === 'individual-developer' ? (
      <ServiceContent
        serviceName={serviceName}
        serviceURL={serviceURL}
        selfIntroduction={selfIntroduction}
        nickname={nickname}
        isDog={isDog}
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
  selfIntroduction: PropTypes.string,
  helmet: PropTypes.object,
  templateType: PropTypes.string,
  isDog: PropTypes.bool,
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
        selfIntroduction={post.frontmatter.selfIntroduction}
        templateType={post.frontmatter.templateType}
        isDog={post.frontmatter.isDog}
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
        selfIntroduction
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
        isDog
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
