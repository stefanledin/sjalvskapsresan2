import React from "react"
import './components/style.css';
import Sidebar from './components/sidebar';
import Img from 'gatsby-image';

const IndexPage = ( { data } ) => {
    const post = data.wordpressPost;
    const thumbnail = post.featured_media;

    return (
        <div className="relative">
        <aside className="m-4 w-3/12 inset-y-0 z-1 absolute">
            <div className="bg-orange-200 shadow rounded-lg">
            <ul>
                <Sidebar posts={data.allWordpressPost.edges} />
            </ul>
            </div>
        </aside>
        <main className="container-fluid mx-auto">
            <header className="text-center">
            <h1 className="mb-6 text-4xl pacifico text-red-700">Självskapsresan 2(019)</h1>
            </header>
            <article className="bg-white mb-6 shadow-lg w-9/12 mx-auto">
                {thumbnail &&
                    <Img fluid={thumbnail.localFile.childImageSharp.fluid} backgroundColor="yellow" />
                }
                <div className="p-6">
                    <span className="pacifico text-2xl text-orange-500 text-center block">Dag 6: München</span>
                    <h1 className="mb-6 text-5xl pacifico text-red-600 text-center">{post.title}</h1>
                    <div className="pt-4 pb-4 mx-auto w-9/12" dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </article>
        </main>
        </div>
    )
}

export default IndexPage

export const pageQuery = graphql`
  query($slug: String) {
    allWordpressPost(sort: {order: ASC, fields: date}) {
      edges {
        node {
          id
          title
          date
          slug
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
          categories {
            name
            id
          }
        }
      }
    }
    wordpressPost(slug: {eq: $slug}) {
        id
        title
        content
        date
        featured_media {
            localFile {
                childImageSharp {
                    fluid(maxWidth: 1440) {
                        base64
                        tracedSVG
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                        originalImg
                        originalName
                        presentationWidth
                        presentationHeight
                    }
                }
            }
        }
    }
  }
`