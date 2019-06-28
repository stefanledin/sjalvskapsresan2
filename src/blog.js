import React from "react"
import './components/style.css';
import Sidebar from './components/sidebar';
import Img from 'gatsby-image';

const IndexPage = ( { data } ) => {
    const post = data.wordpressPost;
    const thumbnail = post.featured_media;

    return (
        <div className="relative">
            <aside className="m-0 w-3/4 inset-y-0 z-20 absolute bg-orange-100 rounded-r-lg -shadow-xl -border-l-4 border-orange-300">
                <div className="mx-4 bg-orange-2000 overflow-hidden">
                    <ul className="list-none">
                        <Sidebar posts={data.allWordpressPost.edges} />
                    </ul>
                </div>
            </aside>
            <div className="fixed inset-0 bg-black z-10 opacity-75"></div>
            <main className="container mx-auto mb-6 bg-orange-300 overflow-hidden shadow-md">
                <header className="text-center">
                    <h1 className="mt-2 mb-6 text-3xl sm:text-4xl lg:text-5xl pacifico text-red-700">Självskapsresan 2</h1>
                </header>
                <article className="bg-white mb-6 w-11/12 mx-auto">
                    {thumbnail &&
                        <Img fluid={thumbnail.localFile.childImageSharp.fluid} backgroundColor="yellow" />
                    }
                    <div className="mx-auto py-4 lg:py-6 w-11/12 lg:w-10/12 xl:w-8/12">
                        <span className="mb-1 pacifico text-2xl text-orange-500 text-center block">{post.acf.sub_heading}</span>
                        <h1 className="mb-5 text-4xl sm:text-5xl lg:text-6xl pacifico text-red-600 text-center">{post.title}</h1>
                        <span className="mb-0 text-gray-600 block text-left text-sm">{post.date}</span>
                        <div className="mx-auto " dangerouslySetInnerHTML={{ __html: post.content }} />
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