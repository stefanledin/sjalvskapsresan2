import React from 'react';
import Img from 'gatsby-image';

export default (props) => {
    const post = props.post;
    const thumbnail = post.featured_media;
    return (
        <article className="shadow bg-white mb-6 mx-auto">
            {thumbnail &&
                <Img fluid={thumbnail.localFile.childImageSharp.fluid} backgroundColor="yellow" />
            }
            <div className="mx-auto py-4 lg:py-6 w-11/12 lg:w-9/12 xl:w-8/12">
                <span className="mb-1 pacifico text-2xl text-orange-500 text-center block">{post.acf.sub_heading}</span>
                <h1 className="mb-5 text-4xl sm:text-5xl lg:text-6xl pacifico text-red-600 text-center">{post.title}</h1>
                <span className="mb-0 text-gray-600 block text-left text-sm">{post.date}</span>
                <div className="mx-auto " dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    )
}