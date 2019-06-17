/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;

    const result = await graphql(`
        query {
            allWordpressPost {
                edges {
                    node {
                        id
                        title
                        date
                        slug
                    }
                }
            }
        }
    `)
    if (result.errors) {
        throw new Error(result.errors)
    }

    result.data.allWordpressPost.edges.forEach(({node}) => {
        createPage({
            path: `/${node.slug}/`,
            component: path.resolve('./src/components/article.js'),
            context: {
                id: node.id,
                slug: node.slug
            }
        })
    })
    /*
    const allWordpressPost = result.data;
    
    allWordpressPost.edges.map(({node}) => {
        createPage({
            path: node.slug
        })
    })
    */
}