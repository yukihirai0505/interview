import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'
import { OGP } from '../components/OpenGraphProtocol'
import {
  NormalContent,
  IndividualDeveloperContent,
} from '../components/BlogContent'
import {
  // FacebookShareButton,
  // FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { globalHistory } from '@reach/router'

export const BlogPostTemplate = ({
  helmet,
  date,
  url,
  title,
  subTitle,
  selfIntroduction,
  templateType,
  serviceName,
  nickname,
  icon,
  twitterAccountName,
  contents,
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
            {templateType === 'normal' ? (
              <NormalContent
                selfIntroduction={selfIntroduction}
                nickname={nickname}
                icon={icon}
                contents={contents}
              />
            ) : templateType === 'individual-developer' ? (
              <IndividualDeveloperContent
                serviceName={serviceName}
                selfIntroduction={selfIntroduction}
                nickname={nickname}
                icon={icon}
                contents={contents}
              />
            ) : null}
            <div style={{ padding: '36px 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* <FacebookShareButton url={url}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton> */}
                <TwitterShareButton
                  title={title}
                  via="@plzprme"
                  url={url}
                  style={{ marginLeft: '8px' }}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  selfIntroduction: PropTypes.string,
  helmet: PropTypes.object,
  templateType: PropTypes.string,
  serviceName: PropTypes.string,
  nickname: PropTypes.string,
  icon: PropTypes.string,
  contents: PropTypes.array,
}

const BlogPostCaptchaImage = ({ imageInfo }) => {
  const { alt = '', image } = imageInfo
  return (
    <div>
      <div className="blog-post-background-captcha-image">
        <Img
          style={{ 'object-fit': 'cover', hegiht: '356px' }}
          fluid={image.childImageSharp.fluid}
          alt={alt}
        />
      </div>
      <div className="blog-post-captcha-image">
        <Img fluid={image.childImageSharp.fluid} alt={alt} />
      </div>
    </div>
  )
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  const articleTitle = post.frontmatter.title
  const articleUrl = `https://pr.yabaiwebyasan.com${globalHistory.location.pathname}`

  return (
    <Layout>
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
        serviceName={post.frontmatter.serviceName}
        nickname={post.frontmatter.nickname}
        icon={post.frontmatter.iconImage.childImageSharp.fluid.src}
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
            fluid(maxWidth: 560, maxHeight: 294, quality: 100) {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
        templateType
        serviceName
        contents {
          question
          answer
          imagePath {
            childImageSharp {
              fluid(quality: 100) {
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
            fluid(maxWidth: 300, maxHeight: 300, quality: 100) {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
        twitterAccountName
      }
    }
  }
`
