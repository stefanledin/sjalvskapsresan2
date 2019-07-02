import React, { useState } from "react"
import './components/style.css';
import {useSpring, animated} from 'react-spring'
import Sidebar from './components/sidebar';
import Article from './components/article';

const IndexPage = ( {data} ) => { 
    const [navIsOpen, toggleNav] = useState(false);
    const post = data.wordpressPost;

    const props = useSpring({
        from: {translateX: '-100%'},
        to: {translateX: '0'}
    })

    return (
        <div className="container mx-auto flex shadow-lg bg-orange-100 mb-6 relative overflow-hidden">
            
            <animated.aside style={props} className="m-0 w-2/3 inset-y-0 z-20 absolute bg-orange-100">
                <div className="mx-4 bg-orange-2000 overflow-hidden">
                    <ul className="m-0 list-none">
                        <Sidebar 
                            posts={data.allWordpressPost.edges} 
                            onNavigation={() => toggleNav(false)}
                        />
                    </ul>
                </div>
            </animated.aside>
            
            <animated.div style={props} className="absolute z-10 inset-0 bg-black opacity-0" onClick={() => toggleNav(true)}></animated.div>

            <main className="w-11/12 mx-auto mb-6 -bg-orange-200 overflow-hidden -shadow-md relative">
                <header className="text-center">
                    <button className="absolute left-0 top-0 bg-red-600 text-white" onClick={() => toggleNav(true)}>Inlägg</button>
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
                fixed(width: 300) {
                  aspectRatio
                  base64
                  height
                  originalName
                  src
                  srcSet
                  srcWebp
                  width
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