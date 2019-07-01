import React from "react"
import './components/style.css';
import Sidebar from './components/sidebar';
import Article from './components/article';

const IndexPage = ( { data } ) => {
    const post = data.wordpressPost;

    return (
        <div className="container mx-auto flex shadow-lg bg-orange-100 mb-6">
            <aside className="m-0 w-1/4 -inset-y-0 z-20 absolute bg-orange-100 rounded-r-lg">
                <div className="mx-4 bg-orange-2000 overflow-hidden">
                    <ul className="m-0 list-none -border-l-2 -border-orange-700">
                        <Sidebar posts={data.allWordpressPost.edges} />
                    </ul>
                </div>
            </aside>

            <main className="w-11/12 mx-auto mb-6 -bg-orange-200 overflow-hidden -shadow-md">
                <header className="text-center">
                    <h1 className="mt-2 mb-6 text-3xl sm:text-4xl lg:text-5xl pacifico text-red-700 leading-none">
                      Självskapsresan 2 <br /><span className="mt-4 block text-lg md:text-xl text-orange-700">...eller finns det svenskt kaffe på tåget?</span>
                    </h1>
                </header>
                <Article post={post} />
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
          date(formatString: "HH:mm, ddd DD MMMM", locale: "sv-SE")
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
        date(formatString: "HH:mm, ddd DD MMMM", locale: "sv-SE")
        acf {
          sub_heading
        }
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