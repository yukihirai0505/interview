import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

class PickUpBlogPost extends React.Component {
  render() {
    const { data } = this.props
    const { node: post } = data.post

    return (
      <div className="pickup">
        <div className="pickup-content">
          <Link to={post.fields.slug} className="pickup-link">
            <div className="background"></div>
            <div className="pickup-image">
              <img
                src={post.frontmatter.featuredimage.childImageSharp.fluid.src}
                alt={post.frontmatter.description}
                className="image"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="pickup-title-wrapper">
              <p className="sub-title">{post.frontmatter.subTitle}</p>
              <h1 className="title">{post.frontmatter.title}</h1>
              <span className="date">{post.frontmatter.date}</span>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

PickUpBlogPost.propTypes = {
  post: PropTypes.object.isRequired,
}

export default post => <PickUpBlogPost data={post} />
