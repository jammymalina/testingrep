import React, { Component } from 'react';

import CalendarForm from './calendar-form';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : '',
            description: props.description ? props.description : '',
            defaultDate: props.defaultDate ? props.defaultDate : null
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleTitleEdit = this.handleTitleEdit.bind(this);
        this.handleDescEdit = this.handleDescEdit.bind(this);
    }

    render() {
        return (
            <div className="todo-form">
                <form onSubmit={this.handleFormSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="todo-title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleTitleEdit}
                            value={this.state.title}
                            id="todo-title"
                            placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="todo-desc">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleDescEdit}
                            value={this.state.description}
                            id="todo-desc"
                            placeholder="Description" />
                    </div>
                    <CalendarForm defaultDate={this.state.defaultDate} handleDateChange={(deadline) => {
                        this.setState({
                            deadline
                        });
                    }} />
                    <button type="submit" className="btn btn-primary" style={{marginRight: '10px'}}>{this.props.btnCaption}</button>
                    <button type="button" className="btn btn-danger" onClick={this.props.handleCancelClick}>Cancel</button>
                </form>
            </div>
        );
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.title, this.state.description, this.state.deadline);
    }

    handleTitleEdit(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleDescEdit(event) {
        this.setState({
            description: event.target.value
        });
    }
}

export default TodoForm;
