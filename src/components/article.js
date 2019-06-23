import React from 'react';
import { graphql } from 'gatsby';

export default ({data}) => {
    if (!data) {
        throw new Error('Nåt fel!');
    }
    const post = data.wordpressPost;
    console.log(post);
    return (
        <article className="bg-white mb-6 shadow-lg w-9/12 mx-auto">
            {post.featured_media &&
                <img src={post.featured_media.localFile.url} alt="Plask" />
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
                    url
                }
            }
        }
    }
`