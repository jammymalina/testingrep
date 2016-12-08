import React from 'react';
import moment from 'moment';

import { DATE_FORMAT } from './calendar-form';

const TodoItem = (props) => {
    const { item, removeItem, setCompleted, handleUpdateClick } = props;
    const deadline = moment(item.deadline, DATE_FORMAT);
    const now = moment();
    const panelClass = item.completed ? 'panel-success' : 'panel-default';
    return (
        <div className={`panel ${panelClass}`}>
            <div className={`panel-heading`} role="tab" id={`todo-heading-${item.id}`}>
                <h4 className="panel-title pull-left">
                    <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#todo-list"
                        href={'#todo-collapse-' + item.id}
                        aria-expanded="true"
                        aria-controls={'todo-collapse-' + item.id}>
                            {item.title}
                    </a>
                    {!item.completed && deadline.isBefore(now) ? <small className='red'> You missed a deadline you lazy piece of shit</small> : null}
                    <br />
                    <small> {deadline.from(now)}</small>
                </h4>
                <form className="form-inline pull-right" noValidate>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <input type="checkbox" checked={item.completed} onChange={(event) => setCompleted(item.id, event.target.checked)} />
                        </span>
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-default" onClick={() => handleUpdateClick(item.id)}><span className="glyphicon glyphicon-edit"></span></button>
                            <button type="button" className="btn btn-danger" onClick={() => removeItem(item.id)}><span className="glyphicon glyphicon-remove"></span></button>
                        </span>
                    </div>
                </form>
                <div className="clearfix"></div>
            </div>
            <div id={'todo-collapse-' + item.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={'todo-heading-' + item.id}>
                <div className="panel-body">
                    {item.description}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
