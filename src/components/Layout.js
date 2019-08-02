import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import { OGP } from './OpenGraphProtocol'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <OGP
        title={title}
        description={description}
        url="https://pr.yabaiwebyasan.com/"
        type="business.business"
        imageUrl={`https://pr.yabaiwebyasan.com/img/stema.png`}
      />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
