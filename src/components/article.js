import React from 'react';
import { graphql } from 'gatsby';
import neuschwanstein from '../images/neuschwanstein.jpg'

export default ({data}) => {
    if (!data) {
        throw new Error('Nåt fel!');
    }
    const post = data.wordpressPost;
    console.log(post);
    return (
        <article className="bg-white mb-6 shadow-lg w-9/12 mx-auto">
            <div className="p-6">
                <span className="pacifico text-2xl text-orange-500 text-center block">Dag 6: München</span>
                <h1 className="mb-6 text-5xl pacifico text-red-600 text-center">{post.title}</h1>
                <div className="pt-4 pb-4 mx-auto w-9/12" />
            </div>
            <img src={neuschwanstein} alt="Neuschwanstein" />
        </article>
    )
}

/*
export const query = graphql`
    query {
        site {
            siteMetadata {
            title
            }
        }
    }
`
*/

export const query = graphql`
    query($slug: String) {
        wordpressPost(slug: {eq: $slug}) {
            id
            slug
            title
            content
        }
    }
`