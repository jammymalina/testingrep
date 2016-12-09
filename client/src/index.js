import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import uuidV4 from 'uuid/v4';

import TodoList from './components/todo-list';
import TodoForm from './components/todo-form';
import customStyle from './style/custom.css';

class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            currentItem: null,
            btnCaption: 'Add item'
        };

        this.removeItem = this.removeItem.bind(this);
        this.removeCompleted = this.removeCompleted.bind(this);
        this.setCompleted = this.setCompleted.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        const timeout = 200;
        let formElement;
        if (this.state.currentItem) {
            formElement = (
                /*<ReactCSSTransitionGroup
                    transitionName = "animation"
                    transitionAppear = {true} transitionAppearTimeout = {timeout}
                    transitionEnterTimeout = {timeout} transitionLeaveTimeout = {timeout}>*/
                    <TodoForm
                        key={uuidV4()}
                        defaultDate={this.state.currentItem.deadline}
                        title={this.state.currentItem.title}
                        description={this.state.currentItem.description}
                        btnCaption={this.state.btnCaption}
                        handleCancelClick={() => this.setState({currentItem: null})}
                        handleFormSubmit={this.handleFormSubmit} />
                /*</ReactCSSTransitionGroup>*/
            );
        } else {
            formElement = (
                /*<ReactCSSTransitionGroup
                    transitionName = "animation"
                    transitionAppear = {true} transitionAppearTimeout = {timeout}
                    transitionEnterTimeout = {timeout} transitionLeaveTimeout = {timeout}>*/
                    <div key={uuidV4()} style={{marginBottom: '20px'}}>
                        <button
                            className="btn btn-primary"
                            style={{marginRight: '10px'}}
                            onClick={() => this.setState({
                                currentItem: {
                                    title: '',
                                    description: '',
                                    id: uuidV4(),
                                    completed: false,
                                    deadline: null
                                },
                                btnCaption: 'Add item'}
                            )}>
                            <span className="glyphicon glyphicon-plus"></span>
                        </button>
                        <button className="btn btn-danger" onClick={this.removeCompleted}>Remove completed items</button>
                    </div>
                /*</ReactCSSTransitionGroup>*/
            );
        }
        return (
            <div className="row">
                <div className="col-md-8 col-md-push-2 white-panel shadow-6dp">
                    <TodoList ref="todolist" items={this.state.items} removeItem={this.removeItem} setCompleted={this.setCompleted} handleUpdateClick={this.handleUpdateClick} />
                    {formElement}
                </div>
            </div>
        );
    }

    handleFormSubmit(title, description, deadline) {
        const item = {
            id: this.state.currentItem.id,
            completed: this.state.currentItem.completed,
            title,
            description,
            deadline
        };
        this.updateItems(item);
        this.setState({
            currentItem: null
        });
    }

    handleUpdateClick(id) {
        const item = _.find(this.state.items, ['id', id]);
        this.setState({
            currentItem: item ? item : null,
            btnCaption: 'Update item'
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get(`/items`).then(res => {
            if (res.error) {
                console.log(res.error);
            }
            const data = res.data;
            if (data.error) {
                console.error(data.error);
            }
            const items = data.data;
            this.setState({
                items
            });
        });
    }

    removeCompleted() {
        const items = _.filter(this.state.items, (todo) => {
            return !todo.completed;
        });
        this.setState({
            items
        });
    }

    removeItem(id) {
        const items = _.filter(this.state.items, (todo) => {
            return todo.id !== id;
        });
        this.setState({
            items
        });
    }

    setCompleted(id, completed) {
        const items = _.map(this.state.items, (todo) => {
            if (todo.id === id) {
                todo.completed = completed;
            }
            return todo;
        });
        this.setState({ items });
    }

    updateItems(item) {
        let found = false;
        let items = _.map(this.state.items, (todo) => {
            if (todo.id === item.id) {
                found = true;
                return item;
            }
            return todo;
        });
        if (!found) {
            items = [...items, item];
        }
        this.setState({
            items
        });
    }
}

ReactDOM.render(
    <TodoApp/>, document.getElementById('todoapp')
);
