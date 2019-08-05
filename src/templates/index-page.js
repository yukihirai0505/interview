import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useFirebaseUser } from '@src/hooks/useFirebaseUser'
import IndexPageTemplate from '@src/components/pages/IndexPageTemplate'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import { navigate } from 'gatsby-link'

const templates = [{ title: '青汁王子風' }]

const createFiction = async templateType => {
  navigate(`/preview?templateKey=${templateType}`)
}

export const IndexSignInPageTemplate = () => {
  return (
    <section className="section">
      <div className="post-container">
        <div>
          <h4 className="post-page-title">自動で取材風記事をつくる</h4>
        </div>
        <div>
          <ul className="fiction-title-list">
            {templates.map((template, key) => {
              return (
                <li key={key}>
                  <a onClick={() => createFiction(key)}>{template.title}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h4 className="post-page-title" style={{ marginTop: '20px' }}>
            真面目に取材記事をつくる
          </h4>
        </div>
        <a href={'https://forms.gle/twhjDuw32mEJZwz77'}>→【Googleフォーム】</a>
      </div>
    </section>
  )
}

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const user = useFirebaseUser()
  return (
    <Layout user={user}>
      {user ? <IndexSignInPageTemplate /> : <IndexPageTemplate posts={edges} />}
    </Layout>
  )
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
                fluid(maxWidth: 560, maxHeight: 294) {
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
