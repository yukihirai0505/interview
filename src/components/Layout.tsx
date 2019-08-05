import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { OGP } from './OpenGraphProtocol'
import { User } from '@src/types'

export default ({
  user,
  children,
  isWebsite = true,
}: {
  user?: User | null
  children: JSX.Element[] | JSX.Element
  isWebsite?: boolean
}) => {
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
      <Navbar user={user} />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
