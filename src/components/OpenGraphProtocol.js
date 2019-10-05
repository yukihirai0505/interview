import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'

export const OGP = ({ title, description, url, type, imageUrl }) => (
  <Helmet>
    <html lang="ja" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${withPrefix('/')}img/apple-touch-icon.png`}
    />
    <link
      rel="icon"
      type="image/png"
      href={`${withPrefix('/')}img/favicon-32x32.png`}
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href={`${withPrefix('/')}img/favicon-16x16.png`}
      sizes="16x16"
    />
    <link
      rel="mask-icon"
      href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
      color="#ff4400"
    />
    <meta name="theme-color" content="#fff" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="ステマ!" />
    <meta property="og:image" content={imageUrl} />
    <meta property="fb:app_id" content="402547887043929" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@plzprme" />
    <meta
      name="google-site-verification"
      content="lylvrBhCOQSkXI3oY9l3Gja-3NleTcUy1h9Obi_lqPI"
    />
  </Helmet>
)

OGP.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  imageUrl: PropTypes.string,
}
