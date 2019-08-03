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

export const BlogPostTemplate = ({
  helmet,
  date,
  title,
  subTitle,
  templateType,
  serviceName,
  nickname,
  icon,
  contents,
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column blog-post-content-wrapper">
            <span className="blog-post-sub-title">{subTitle}</span>
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
            {templateType === 'normal' ? (
              <NormalContent
                nickname={nickname}
                icon={icon}
                contents={contents}
              />
            ) : templateType === 'individual-developer' ? (
              <IndividualDeveloperContent
                serviceName={serviceName}
                nickname={nickname}
                icon={icon}
                contents={contents}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
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
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            url={`https://pr.yabaiwebyasan.com/blog/${post.id}`}
            imageUrl={`https://pr.yabaiwebyasan.com${post.frontmatter.captchaImage.childImageSharp.fluid.src}`}
          />
        }
        date={post.frontmatter.date}
        title={post.frontmatter.title}
        subTitle={post.frontmatter.subTitle}
        templateType={post.frontmatter.templateType}
        serviceName={post.frontmatter.serviceName}
        nickname={post.frontmatter.nickname}
        icon={post.frontmatter.iconImage.childImageSharp.fluid.src}
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
              fluid(maxWidth: 300, maxHeight: 300, quality: 100) {
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
      }
    }
  }
`
