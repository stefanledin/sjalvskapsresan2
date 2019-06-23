import React from 'react';

export default (props) => {
    let currentCategory = null;
    let showCategory = true;

    return props.posts.map(({node}) => {
        if (currentCategory !== node.categories[0].name) {
            currentCategory = node.categories[0].name;
            showCategory = true;
        } else {
            showCategory = false;
        }
    
        return (
            <h2 className="m-2 pacifico text-3xl text-red-700" key={node.id}>
                {showCategory &&
                <span className="block">{node.categories[0].name}</span>
                }
                <a href={`/${node.slug}`}>{node.title}</a>
            </h2>
        )
    });
}