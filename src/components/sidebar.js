import React from 'react';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCategory: null
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
        if (this.state.currentCategory === index) {
            index = null;
        }
        this.setState({
            currentCategory: index
        })
    }

    render() {
        
        return this.groupPostByCategory().map((group, index) => {
            const postList = group.posts.map(post => (
                <li key={post.id} className="m-2 pacifico text-3xl text-red-700">
                    <a href={`/${post.slug}`}>{post.title}</a>
                </li>
            ));
            const plask = this.state.currentCategory === index ? 'bg-orange-300' : '';
            return (
                <li key={index} className={plask + ' pacifico text-3xl text-red-700'}>
                    <span onClick={(e) => this.setCurrentCategory(index, e)} className="p-2 cursor-pointer block">{group.category.name}</span>
                    {this.state.currentCategory === index &&
                        <ul>
                            {postList}
                        </ul>
                    }
                </li>
            )
        });
    }
}