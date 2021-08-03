import React from 'react'
import { RichText, Link } from 'prismic-reactjs'

const TopProducts = ({ slice }) => (
  <section className="image-gallery container">
    <RichText render={slice.primary.galleryTitle} />
    <div className="gallery">
      {slice?.items?.map((item, i) =>
        <a href={Link.url(item.link)}>
          <div key={i} className="gallery-item">
            <img
              src={item.productImage.url}
              alt={item.productImage.alt}
            />
            <RichText render={item.productDescription} />
          </div>
        </a>
      )}
    </div>
    <style jsx>{
      `
      .image-gallery {
        margin-bottom: 3.75rem;
        padding: 20px;
        color: #72767b;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.4;
        line-height: 28px;
      }
      .gallery {
        display: -webkit-box;  /* OLD - iOS 6-, Safari 3.1-6, BB7 */
        display: -ms-flexbox;  /* TWEENER - IE 10 */
        display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-justify-content: space-between; 
        justify-content: space-between; 
      }
      .gallery-item {
        -webkit-box-flex: 0 1 48%;
        -moz-box-flex:  0 1 48%;
        -webkit-flex:  0 1 48%;
        -ms-flex:  0 1 48%;
        flex: 0 1 48%;
      }
      .gallery img {
        margin-bottom: 1rem;
      }
      @media (max-width: 767px) {
        .image-gallery {
          margin-bottom: 2rem;
        }
        .gallery-item {
          -webkit-box-flex: 100%;
          -moz-box-flex:  100%;
          -webkit-flex:  100%;
          -ms-flex:  100%;
          flex: 100%;
        }
      }
      `
    }</style>

  </section>
)

export default TopProducts