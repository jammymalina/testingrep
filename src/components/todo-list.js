import React, { Component } from 'react';

import TodoItem from './todo-list-item';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.items.map(todo => {
            return <TodoItem key={todo.id} item={todo} />
        });
        return (
            <div className="col-md-8 col-md-push-2 white-panel shadow-6dp">
                <div className="panel-group" id="todo-list" role="tablist" aria-multiselectable="true">
                    {items}
                </div>
            </div>
        );
    }
}

export default TodoList;
