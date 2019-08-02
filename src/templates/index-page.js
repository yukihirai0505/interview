import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import PickUpBlogPost from '../components/PickUpBlogPost'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({ posts }) => {
  const post = posts[0]
  return (
    <div>
      <PickUpBlogPost post={post} />
      <section className="section">
        <div className="post-container">
          <div>
            <h3 className="post-page-title">新着取材</h3>
          </div>
          <BlogRoll posts={posts.slice(0)} />
          <div className="has-text-centered">
            <div className="read-more">
              <Link to="/blog">他の取材もみる</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  posts: PropTypes.array,
}

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <IndexPageTemplate posts={edges} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 20
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
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
          }
        }
      }
    }
  }
`
