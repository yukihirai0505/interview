import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export const BlogIndexPageTemplate = ({ posts }) => {
  return (
    <Layout>
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
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
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
