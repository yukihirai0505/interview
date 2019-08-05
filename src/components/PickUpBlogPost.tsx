import React from 'react'
import { Link } from 'gatsby'
import { Post } from '@src/types'

export default ({ data }: { data: Post }) => {
  const { node: post } = data

  return (
    <div className="pickup">
      <div className="pickup-content">
        <Link to={post.fields.slug} className="pickup-link">
          <div className="background"></div>
          <div className="pickup-image">
            <img
              src={post.frontmatter.captchaImage!.childImageSharp!.fluid!.src}
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
