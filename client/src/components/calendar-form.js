import React, { Component } from 'react';
import { TransitionView, Calendar } from 'react-date-picker';
import moment from 'moment';

import 'react-date-picker/index.css'

export const DATE_FORMAT = 'DD/MM/YYYY';

class CalendarForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: props.defaultDate ? props.defaultDate : moment().format(DATE_FORMAT),
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    render() {
        return (
            <div className='calendar-form'>
                <TransitionView>
                    <Calendar
                        dateFormat={DATE_FORMAT}
                        defaultDate={this.state.currentDate}
                        onChange={this.handleDateChange}
                    />
                </TransitionView>
            </div>
        );
    }

    handleDateChange(dateString) {
        this.setState({
            currentDate: dateString
        });
        this.props.handleDateChange(dateString);
    }
}

export default CalendarForm;
