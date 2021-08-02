import React from 'react'
import { RichText } from 'prismic-reactjs'

const Banner = ({ slice }) => (
  <section className="homepage-banner">
    <div className="banner-content container">
      <span className="logo">
        <img src={slice.primary.logo.url} alt={slice.primary.logo.alt} />
      </span>
      <span className="title">
        <RichText render={slice.primary.title} />
      </span>
      <span className="description">
        <RichText render={slice.primary.description} />
      </span>
      <span className="storeHours">
        <RichText render={slice.primary.storeHours} />
      </span>
    </div>
    <style jsx>{`
      .hompage-banner {

      }
      .banner-content {
        text-align: center;
      }
      .logo {

      }
      .title {

      }
      .description {

      }
      .storeHours {

      }
    `}
    </style>
  </section>
)

export default Banner