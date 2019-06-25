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

    const latest = result.data.allWordpressPost.edges[0];
    createPage({
        path: '/',
        component: path.resolve('./src/blog.js'),
        context: {
            id: latest.node.id,
            slug: latest.node.slug
        }
    })

    result.data.allWordpressPost.edges.forEach(({node}) => {
        createPage({
            path: `/${node.slug}/`,
            component: path.resolve('./src/blog.js'),
            context: {
                id: node.id,
                slug: node.slug
            }
        })
    })
}