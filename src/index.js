import React from "react"
import './components/style.css';
import clock from './images/iconmonstr-time-3.svg';
import facebookIcon from './images/iconmonstr-facebook.svg';
import Sidebar from './components/sidebar';
import Counter from './components/counter';
import { Link } from "gatsby";

const IndexPage = ( {data} ) => { 
    const post = data.wordpressPost;

    return (
      <div className="container mx-auto shadow-lg bg-orange-100 mb-6">
        <main className="w-full overflow-hidden">
          <nav className="bg-orange-400 flex flex-wrap justify-between flex-row">
            <div className="flex">
              <Link to="/" className="bg-orange-500 hover:bg-orange-600 flex items-center px-2 py-1">
                <svg className="block md:mr-1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path fill="white" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
                <span className="hidden md:block text-xs text-white uppercase tracking-wide">Inlägg</span>
              </Link>

              <div className="flex items-center px-2 py-1">
                <img className="m-0 mr-1 block" src={clock} />
                <span className="text-xs text-white uppercase tracking-wide">
                  <Counter />
                </span>
              </div>
            </div>
              
            <a 
              className="bg-orange-500 hover:bg-orange-600 hover:text-white flex px-2 py-1 text-white items-center" 
              href="https://www.facebook.com/sjalvskapsresan/"
              rel="noopener noreferrer" 
              target="_blank">
              <img className="m-0 md:mr-1 block" src={facebookIcon} />
              <span className="hidden md:block text-xs uppercase text-white tracking-wide">Facebook</span>
            </a>
          </nav>

          <section className="w-11/12 mx-auto mb-6">
            <header>
              <h1 className="text-center mt-4 mb-6 text-4xl lg:text-5xl pacifico text-red-700 leading-none">
                Självskapsresan 2 <br /><span className="mt-5 block text-lg md:text-xl text-orange-700">...eller finns det svenskt kaffe på tåget?</span>
              </h1>
            </header>

            <div className="m-0 list-none mb-6 mx-auto">
              <Sidebar posts={data.allWordpressPost.edges} />
            </div>

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
                fluid(sizes: "(min-width: 1280px) 327px, (min-width: 768px) 39vw, 81vw") {
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