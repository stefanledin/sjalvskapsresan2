import React from "react"
import '../components/style.css';
import Sidebar from '../components/sidebar';

const IndexPage = ( { data } ) => {
  console.log(data);
  return (
    <div className="relative">
      <aside className="m-4 w-3/12 inset-y-0 z-1 absolute">
        <div className="bg-orange-200 shadow rounded-lg">
          <ul>
            <Sidebar posts={data.allWordpressPost.edges} />
          </ul>
        </div>
      </aside>
      <main className="container mx-auto">
        <header className="text-center">
          <h1 className="mb-6 text-4xl pacifico text-red-700">Självskapsresan 2(019)</h1>
        </header>
        


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
          categories {
            name
            id
          }
        }
      }
    }
  }
`