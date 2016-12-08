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

        for (let i = 0; i < 10; i++)
            console.log(uuidV4());

        this.removeItem = this.removeItem.bind(this);
        this.removeCompleted = this.removeCompleted.bind(this);
        this.setCompleted = this.setCompleted.bind(this);
        this.addCurrentItem = this.addCurrentItem.bind(this);
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
                        key="f8z0kjsmzn"
                        title={this.state.currentItem.title}
                        description={this.state.currentItem.description}
                        btnCaption={this.state.btnCaption}
                        handleCancelClick={() => this.setState({currentItem: null})}
                        handleFormSubmit={this.addCurrentItem} />
                /*</ReactCSSTransitionGroup>*/
            );
        } else {
            formElement = (
                /*<ReactCSSTransitionGroup
                    transitionName = "animation"
                    transitionAppear = {true} transitionAppearTimeout = {timeout}
                    transitionEnterTimeout = {timeout} transitionLeaveTimeout = {timeout}>*/
                    <div key="4ci4ekoipl" style={{marginBottom: '20px'}}>
                        <button
                            className="btn btn-primary"
                            style={{marginRight: '10px'}}
                            onClick={() => this.setState({
                                currentItem: {title: '', description: ''},
                                btnCaption: 'Add item'})}>
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
                    <TodoList ref="todolist" items={this.state.items} removeItem={this.removeItem} setCompleted={this.setCompleted} />
                    {formElement}
                </div>
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

    removeCompleted() {
        const items = _.filter(this.state.items, (todo) => {
            return !todo.completed;
        });
        this.setState({ items });
    }

    removeItem(id) {
        const items = _.filter(this.state.items, (todo) => {
            return todo.id !== id;
        });
        this.setState({ items });
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

    addCurrentItem() {

    }
}

ReactDOM.render(
    <TodoApp/>, document.getElementById('todoapp')
);
