import React from 'react';
import Img from 'gatsby-image';
import { Link } from "gatsby";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCategories: []
        }
    }

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
                <li key={post.id} className="m-0 p-0 w-full flex border-b border-orange-300">
                    <Link 
                        to={`/${post.slug}`} 
                        activeClassName="border-orange-700 active"
                        onClick={this.props.onNavigation}
                        className="p-4 flex flex-col md:flex-row-reverse w-full border-l-4 border-transparent hover:border-red-600">
                            <div className="w-full md:w-2/4">
                                {post.featured_media &&
                                    <Img fluid={post.featured_media.localFile.childImageSharp.fluid} />
                                }
                            </div>
                            <div className="w-full md:w-2/4">
                                <div className="pt-2 md:pt-0 md:px-4">
                                    <span className="block text-xs md:text-sm">{post.date}</span>
                                    <span className="pacifico text-xl md:text-3xl">{post.title}</span>
                                </div>
                            </div>
                    </Link>
                </li>
            ));

            const isCurrent = this.state.currentCategories.indexOf(index) !== -1;
            const currentLiClasses = isCurrent ? 'border-orange-300 shadow' : '';
            const currentSpanClasses = isCurrent ? 'bg-orange-200 hover:bg-orange-300' : '';

            return (
                <li key={index} className={'my-6 border-orange-200 border hover:border-orange-300 hover:border-t-2 ' + currentLiClasses}>
                    <span 
                        onClick={(e) => this.setCurrentCategory(index, e)} 
                        className={currentSpanClasses + ' p-2 xxx-pl-4 cursor-pointer block pacifico text-2xl md:text-3xl text-red-700'}>
                        {group.category.name}
                    </span>
                    {this.state.currentCategories.indexOf(index) !== -1 &&
                        <ul className="m-0 list-none flex flex-wrap">
                            {postList}
                        </ul>
                    }
                </li>
            )
        });
    }
}