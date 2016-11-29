import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import TodoList from './components/todo-list.js';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    render() {
        return (
            <div>
                <TodoList ref="todolist" items={this.state.items}/>
            </div>
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get(`/src/data/items.json`).then(res => {
            const items = res.data;
            this.setState({items});
        });
    }
}

ReactDOM.render(
    <TodoApp></TodoApp>, document.getElementById('todoapp'));
