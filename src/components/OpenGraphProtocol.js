import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export const OGP = ({ title, description, url, type, imageUrl }) => (
  <Helmet>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="ステマ!" />
    <meta property="og:image" content={imageUrl} />
    <meta property="fb:app_id" content="402547887043929" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@plzprme" />
  </Helmet>
)

OGP.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  imageUrl: PropTypes.string,
}
