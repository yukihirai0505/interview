import React from 'react'
import { Link } from 'gatsby'
import { Post } from '@src/types'

export default ({ posts }: { posts: Post[] }) => {
  return (
    <div className="posts">
      {posts &&
        posts.map(({ node: post }) => (
          <Link className="post" to={post.fields.slug} key={post.id}>
            <div className="post-image">
              <img
                src={post.frontmatter.captchaImage!.childImageSharp!.fluid!.src}
                alt={post.frontmatter.description}
                className="image"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="post-heading">
              <h2 className="post-heading-title">{post.frontmatter.title}</h2>
              <span className="post-heading-date">{post.frontmatter.date}</span>
            </div>
          </Link>
        ))}
    </div>
  )
}
