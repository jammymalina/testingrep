import React, { Component } from 'react';
import $ from 'jquery';

import TodoItem from './todo-list-item';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.items.map(todo => {
            return <TodoItem id={`cecky${todo.id}`} key={todo.id} item={todo} />
        });
        return (
            <div className="panel-heading">
                {items}
            </div>
        );
    }
}

export default TodoList;
