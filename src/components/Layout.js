import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'
import GithubCorner from './GithubCorner'

export default ({ children, data }) => {
  const { siteTitle, siteUrl, socialMediaCard, headerScripts } =
    data.settingsYaml || {}
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            headerScripts
            socialMediaCard {
              image
            }
          }
        }
      `}
      render={data => (
        <Fragment>
          <Helmet defaultTitle={siteTitle} titleTemplate={`%s | ${siteTitle}`}>
            {/* Add font link tags here */}
          </Helmet>

          <Meta
            headerScripts={headerScripts}
            absoluteImageUrl={
              socialMediaCard &&
              socialMediaCard.image &&
              siteUrl + socialMediaCard.image
            }
          />

          <GithubCorner url="https://github.com/thriveweb/whitesmoke" />

          <Nav />

          <Fragment>{children()}</Fragment>

          <Footer />
        </Fragment>
      )}
    />
  )
}
