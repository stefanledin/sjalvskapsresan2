import React from "react"
import '../components/style.css';
import Article from '../components/article';

const IndexPage = ( { data } ) => {
  return (
    <div className="relative">
      <aside className="m-4 w-3/12 inset-y-0 z-1 absolute hidden">
        <div className="bg-orange-200 shadow rounded-lg">
          <h2 className="m-2 pacifico text-3xl text-red-700"><span role="img" aria-label="Sverige" aria-labelledby="Sverige">🇸🇪</span> Karlskrona</h2>
        </div>
      </aside>
      <main className="container mx-auto">
        {data.allWordpressPost.edges.map(({node}) => (
          <h2 className="m-2 pacifico text-3xl text-red-700" key={node.id}><a href={`/${node.id}`}>{node.title}</a></h2>
        ))}
        <header className="text-center">
          <h1 className="mb-6 text-4xl pacifico text-red-700">Självskapsresan 2(019)</h1>
        </header>
        <Article />
      </main>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: {order: ASC, fields: date}) {
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
`