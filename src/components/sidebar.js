import React from 'react';
import Img from 'gatsby-image';
import { Link } from "gatsby";

export default class Sidebar extends React.Component {

    groupPostByCategory() {
        let currentCategory = null;
        let postsGroupedByCategory = [];
    
        this.props.posts.forEach(({node}) => {
            if (currentCategory !== node.categories[0].name) {
                postsGroupedByCategory.push({
                    category: node.categories[0],
                    posts: []
                })
                currentCategory = node.categories[0].name;
            }
            postsGroupedByCategory[postsGroupedByCategory.length - 1].posts.push(node);
        })

        return postsGroupedByCategory;
    }

    setCurrentCategory(index, event) {
        let currentCategories = this.state.currentCategories;

        if (currentCategories.indexOf(index) !== -1) {
            currentCategories = currentCategories.filter(category => category !== index);
        } else {
            currentCategories.push(index);
        }

        this.setState({
            currentCategories
        })
    }

    render() {
        return this.groupPostByCategory().map((group, index) => {
            const postList = group.posts.map(post => (
                <div key={post.id} className="m-0 p-0 w-full md:w-2/4 xl:w-1/3 flex mb-4">
                    <Link 
                        to={`/${post.slug}`} 
                        activeClassName="border-orange-700 active"
                        onClick={this.props.onNavigation}
                        className="p-4 w-full bg-white shadow flex flex-col md:mx-2 lg:mx-4 hover:shadow-md">
                            <div className="w-full">
                                {post.featured_media && post.featured_media.localFile &&
                                    <Img fluid={post.featured_media.localFile.childImageSharp.fluid} />
                                }
                            </div>
                            <div className="w-full">
                                <div className="pt-2">
                                    <span className="block text-xs md:text-sm text-orange-500">{post.date}</span>
                                    <span className="pacifico text-xl md:text-3xl">{post.title}</span>
                                </div>
                            </div>
                    </Link>
                </div>
            ));

            return (
                <div key={index} className="mb-2">
                    <span className="border-b-2 border-orange-200 block text-left md:mx-2 lg:mx-4 pacifico text-3xl md:text-4xl lg:text-5xl text-red-700 pt-0 pb-2 mb-4">
                        {group.category.name}
                    </span>
                    <div className="m-0 flex flex-wrap">
                        {postList}
                    </div>
                </div>
            )
        });
    }
}