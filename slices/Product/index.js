import React from 'react'
import { RichText } from 'prismic-reactjs'

const Product = ({ slice }) => (
  <section>
    <span className="title">
      <img src={slice.primary.image.url} alt={slice.primary.image.alt} />
      <RichText render={slice.primary.title} />
    </span>
    <RichText render={slice.primary.description} />
    <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: center;
        }
        .title {
          color: #8592e0;
        }
    `}</style>
  </section>
)

export default Product