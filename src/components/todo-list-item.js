import React from 'react';

const TodoItem = ({item}) => {
    return (
        <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
        </div>
    );
};

export default TodoItem;
