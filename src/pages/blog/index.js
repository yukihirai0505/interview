import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import BlogRoll from '../../components/blog/BlogRoll'
import { graphql } from 'gatsby'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'

export const BlogIndexPageTemplate = ({ posts }) => {
  const user = useFirebaseUser()
  return (
    <Layout user={user}>
      <section className="section">
        <div className="post-container">
          <div>
            <h3 className="post-page-title">取材一覧</h3>
          </div>
          <BlogRoll posts={posts} />
        </div>
      </section>
    </Layout>
  )
}

BlogIndexPageTemplate.propTypes = {
  posts: PropTypes.array,
}

const BlogIndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return <BlogIndexPageTemplate posts={edges} />
}

BlogIndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default BlogIndexPage

export const pageQuery = graphql`
  query BlogIndexPageTemplate {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
            subTitle
            templateKey
            date(formatString: "MMMM DD, YYYY")
            captchaImage {
              childImageSharp {
                fluid(quality: 100) {
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
