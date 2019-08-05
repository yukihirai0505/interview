import { Post } from '@src/types'
import PickUpBlogPost from '../PickUpBlogPost'
import React from 'react'
import BlogRoll from '../blog/BlogRoll'
import { Link } from 'gatsby'

export default ({ posts }: { posts: Post[] }) => {
  const post = posts[0]
  return (
    <div>
      <PickUpBlogPost data={post} />
      <section className="section">
        <div className="post-container">
          <div>
            <h3 className="post-page-title">新着取材</h3>
          </div>
          <BlogRoll posts={posts.slice(1)} />
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
