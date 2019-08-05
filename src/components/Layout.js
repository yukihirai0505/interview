import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { OGP } from './OpenGraphProtocol'

const TemplateWrapper = ({ children, isWebsite = true }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      {isWebsite ? (
        <OGP
          title={title}
          description={description}
          url="https://pr.yabaiwebyasan.com/"
          type="website"
          imageUrl={`https://pr.yabaiwebyasan.com/img/stema.png`}
        />
      ) : null}
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
