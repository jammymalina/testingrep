import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import uuidV4 from 'uuid/v4';

import TodoList from './components/todo-list';
import TodoForm from './components/todo-form';
import { DATE_FORMAT } from './components/calendar-form';
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
        this.errorAlert = this.errorAlert.bind(this);
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
                        handleFormSubmit={this.handleFormSubmit}
                    />
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
                                btnCaption: 'Add item'
                            })}>
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

    errorAlert(error) {
        bootbox.alert({
            size: "small",
            title: "Database error",
            message: error,
        });
    }

    fetchData() {
        axios.get(`/items`).then((res) => {
            if (res.error) {
                console.error(res.error);
                this.errorAlert(res.error);
            }
            const data = res.data ? res.data : { data: [], error: "No data found." };
            if (data.error) {
                console.error(data.error);
                this.errorAlert(data.error);
            }
            const items = _.sortBy(data.data, (todo) => {
                return moment(todo.deadline, DATE_FORMAT).toDate();
            });
            this.setState({
                items
            });
        });
    }

    removeItems(ids) {
        axios.post('/delete', {
            items: ids
        }).then((res) => {
            console.log(res);
            if (res.error) {
                console.error(res.error);
                this.errorAlert(res.error);
            }
            this.fetchData();
        }).catch((error) => {
            console.error(error);
            this.errorAlert(error);
        });
    }

    removeCompleted() {
        const items = _.reduce(this.state.items, (arr, todo) => {
            if (todo.completed)
                arr.push(todo.id);
            return arr;
        }, []);
        this.removeItems(items);
    }

    removeItem(id) {
        this.removeItems([id]);
    }

    setCompleted(id, completed) {
        axios.post(`/setcompleted/${id}=${completed}`).then((res) => {
            console.log(res);
            if (res.error) {
                console.error(res.error);
                this.errorAlert(res.error);
            }
            const data = res.data;
            if (data.error) {
                console.error(data.error);
                this.errorAlert(data.error);
            }
            this.fetchData();
        }).catch((error) => {
            console.error(error);
            this.errorAlert(error);
        });
    }

    updateItems(item) {
        const foundItem = _.find(this.state.items, { id: item.id });
        let updateMethod;
        if (!foundItem) {
            updateMethod = 'add';
        } else {
            updateMethod = 'update';
        }

        axios.post(`/${updateMethod}`, {
            item
        }).then((res) => {
            console.log(res);
            if (res.error) {
                console.error(res.error);
                this.errorAlert(res.error);
            }
            const data = res.data;
            if (data.error) {
                console.error(data.error);
                this.errorAlert(data.error);
            }
            this.fetchData();
        }).catch((error) => {
            console.error(error);
            this.errorAlert(error);
        });

    }
}

ReactDOM.render(
    <TodoApp />, document.getElementById('todoapp')
);
