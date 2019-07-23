import React, { useState } from "react"
import './components/style.css';
import {useSpring, animated} from 'react-spring'
import clock from './images/iconmonstr-time-3.svg';
import facebookIcon from './images/iconmonstr-facebook.svg';
import closeIcon from './images/iconmonstr-x.svg';
import Sidebar from './components/sidebar';
import Counter from './components/counter';
import Article from './components/article';

const IndexPage = ( {data} ) => { 
    const [navIsOpen, toggleNav] = useState(false);
    const post = data.wordpressPost;

    const asideAnimation = useSpring({
        transform: navIsOpen ? 'translateX(0%)' : 'translateX(-100%)',
        config: {
          duration: 250
        }
    })
    const overlayAnimation = useSpring({
        opacity: navIsOpen ? 0.75 : 0,
        config: {
          duration: 125
        }
    })

    return (
        <div className="container mx-auto flex shadow-lg bg-orange-100 mb-6 relative overflow-hidden">
            
            <animated.aside style={asideAnimation} className="m-0 w-11/12 lg:w-2/3 inset-y-0 fixed z-20 bg-orange-100 overflow-auto">
                <div className="mx-4 overflow-hidden flex flex-col">
                    <div className="flex justify-end">
                      <button className="bg-orange-600 text-white px-2 py-1 text-xs uppercase flex items-center" onClick={() => toggleNav(false)}>
                        <img className="m-0 mr-1" src={closeIcon} />
                        <span>Stäng</span>
                      </button>
                    </div>
                    <ul className="m-0 list-none">
                        <Sidebar 
                            posts={data.allWordpressPost.edges} 
                            onNavigation={() => toggleNav(false)}
                        />
                    </ul>
                </div>
            </animated.aside>
            
            {navIsOpen &&
                <animated.div style={overlayAnimation} className="absolute z-10 inset-0 bg-black" onClick={() => toggleNav(false)}></animated.div>
            }

            <main className="w-full overflow-hidden relative">
              <nav className="bg-orange-400 flex flex-wrap justify-between flex-row">
                
                <div className="flex">
                  <button className="bg-orange-500 hover:bg-orange-600 flex items-center px-2 py-1" onClick={() => toggleNav(true)}>
                    <svg className="block md:mr-1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                      <path fill="white" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                    <span className="hidden md:block text-xs text-white uppercase tracking-wide">Inlägg</span>
                  </button>
  
                  <div className="flex items-center px-2 py-1">
                    <img className="m-0 mr-1 block" src={clock} />
                    <span className="text-xs text-white uppercase tracking-wide"><Counter /></span>
                  </div>
                </div>
                
                <a className="bg-orange-500 hover:bg-orange-600 hover:text-white flex px-2 py-1 text-white items-center" href="https://www.facebook.com/sjalvskapsresan/" target="_blank">
                  <img className="m-0 md:mr-1 block" src={facebookIcon} />
                  <span className="hidden md:block text-xs uppercase text-white tracking-wide">Facebook</span>
                </a>
              </nav>
              <section className="w-11/12 mx-auto mb-6">
                <header>
                  <h1 className="text-center mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl pacifico text-red-700 leading-none">
                    Självskapsresan 2 <br /><span className="mt-5 block text-lg md:text-xl text-orange-700">...eller finns det svenskt kaffe på tåget?</span>
                  </h1>
                </header>
                <Article post={post} />
              </section>
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