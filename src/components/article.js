import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default ({data}) => {
    const post = data.wordpressPost;
    const thumbnail = post.featured_media.localFile;
    return (
        <article className="bg-white mb-6 shadow-lg w-9/12 mx-auto">
            {thumbnail &&
                <Img fluid={thumbnail.childImageSharp.fluid} backgroundColor="yellow" />
            }
            <div className="p-6">
                <span className="pacifico text-2xl text-orange-500 text-center block">Dag 6: München</span>
                <h1 className="mb-6 text-5xl pacifico text-red-600 text-center">{post.title}</h1>
                <div className="pt-4 pb-4 mx-auto w-9/12" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    )
}

export const query = graphql`
    query($slug: String) {
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