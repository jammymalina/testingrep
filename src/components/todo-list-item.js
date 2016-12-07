import React from 'react';

const TodoItem = ({item}) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading" role="tab" id={`todo-heading-${item.id}`}>
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
                </h4>
                <form className="form-inline pull-right" noValidate>
                    <div className="checkbox">
                        <input type="checkbox" />
                    </div>
                    <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-edit"></span></button>
                    <button type="button" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-remove"></span></button>
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
