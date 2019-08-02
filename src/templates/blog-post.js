import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'
import hirai from '../img/hirai.jpg'
import interviewer from '../img/interviewer.png'
import { OGP } from '../components/OpenGraphProtocol'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  date,
  tags,
  title,
  subTitle,
  helmet,
}) => {
  const PostContent = contentComponent || Content

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
            <p>
              本日は<b>「とにかく取材されたい欲」</b>
              を満たすサービスを開発した平井さんをお呼びして、「これからの時代に必要な力」というテーマでインタビューしていきたいと思います。
              ということでさっそくこの方に登場願いましょう。
            </p>
            <div className="comment normal">
              <div>
                <picture>
                  <img src={hirai} alt="Yuki Hirai" />
                </picture>
              </div>
              <div className="comment-content">
                <p className="comment-name">平井氏</p>
                <div className="comment-text-wrapper">
                  <p className="comment-text">よろしくお願いいたします。</p>
                </div>
              </div>
            </div>
            <div className="comment reverse">
              <div>
                <picture>
                  <img src={interviewer} alt="Interviewer" />
                </picture>
              </div>
              <div className="comment-content">
                <p className="comment-name">凄腕インタビュアー</p>
                <div className="comment-text-wrapper">
                  <p className="comment-text">
                    よろしくお願いいたします！
                    早速ですがなぜ今回このようなサービスを開発されたのでしょうか？
                  </p>
                </div>
              </div>
            </div>
            <div className="comment normal">
              <div>
                <picture>
                  <img src={hirai} alt="Yuki Hirai" />
                </picture>
              </div>
              <div className="comment-content">
                <p className="comment-name">平井氏</p>
                <div className="comment-text-wrapper">
                  <p className="comment-text">
                    誰でも一度は<b>取材を受けてみたい欲</b>
                    ってあると思うんですよね
                  </p>
                </div>
              </div>
            </div>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  helmet: PropTypes.object,
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
        {post.frontmatter.featuredimage ? (
          <BlogPostCaptchaImage
            imageInfo={{
              image: post.frontmatter.featuredimage,
              alt: `featured image thumbnail for post ${post.title}`,
            }}
          />
        ) : null}
      </div>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        date={post.frontmatter.date}
        helmet={
          <OGP
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            url={`https://pr.yabaiwebyasan.com/blog/${post.id}`}
            imageUrl={`https://pr.yabaiwebyasan.com${post.frontmatter.featuredimage.childImageSharp.fluid.src}`}
          />
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        subTitle={post.frontmatter.subTitle}
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
        date(formatString: "MMMM DD, YYYY")
        title
        subTitle
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 680, maxHeight: 356, quality: 100) {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        tags
      }
    }
  }
`
