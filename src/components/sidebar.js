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
    
        this.props.posts.map(({node}) => {
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
                <li key={post.id} className="p-0 w-full ">
                    <Link 
                        to={`/${post.slug}`} 
                        activeClassName="border-orange-700 active"
                        className="block flex border-l-2 border-transparent hover:border-orange-700">
                            {post.featured_media &&
                                <Img fluid={post.featured_media.localFile.childImageSharp.fluid} backgroundColor="yellow" />
                            }
                            <div className="p-4">
                                <span className="block text-sm">{post.date}</span>
                                <span className="pacifico text-2xl text-red-700">{post.title}</span>
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
                        className={currentSpanClasses + ' p-2 pl-4 cursor-pointer block pacifico text-3xl text-red-700'}>
                        {group.category.name}
                    </span>
                    <ul className="hidden">
                        {postList}
                    </ul>
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