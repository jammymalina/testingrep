import React, { Component } from 'react';

import TodoItem from './todo-list-item';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.items.map(todo => {
            return <TodoItem key={todo.id} item={todo} removeItem={this.props.removeItem} setCompleted={this.props.setCompleted} handleUpdateClick={this.props.handleUpdateClick} />
        });
        return (
            <div className="panel-group" id="todo-list" role="tablist" aria-multiselectable="true">
                {items}
            </div>
        );
    }
}

export default TodoList;
