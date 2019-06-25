import React from 'react';

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
                <li key={post.id} className="py-2 pl-4 bg-orange-300 hover:bg-orange-700">
                    <a href={`/${post.slug}`} className="block">
                        <span className="block text-sm">{post.date}</span>
                        <span className="pacifico text-2xl text-red-700">{post.title}</span>
                    </a>
                </li>
            ));

            const currentClasses = this.state.currentCategories.indexOf(index) !== -1 ? 'bg-orange-400' : '';

            return (
                <li key={index} className={currentClasses}>
                    <span onClick={(e) => this.setCurrentCategory(index, e)} className="p-2 cursor-pointer block pacifico text-3xl text-red-700">{group.category.name}</span>
                    {this.state.currentCategories.indexOf(index) !== -1 &&
                        <ul>
                            {postList}
                        </ul>
                    }
                </li>
            )
        });
    }
}