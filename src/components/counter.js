import React from 'react';
import moment from 'moment';

export default class Counter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: null
        }
        
        this.departure = moment('2019-07-24 08:09');
        this.arrival = moment('2019-08-03 13:46');
        
        setInterval(this.countdown.bind(this), 1000);
    }

    countdown() {
        let diff = moment.duration(this.departure.diff(moment()));

        if (this.arrival.diff(moment() > 0)) {
            
            if (this.hasDepartured(diff)) {
                diff = moment.duration(moment().diff(this.departure))._data;
            } else {
                diff = diff._data;
            }
            this.setState({timer: this.diffAsHTML(diff)});
        
        } else {
            this.setState({timer: this.diffAsHTML(moment.duration(this.arrival.diff(this.departure))._data)});
        }

    }

    hasDepartured(diff) {
        return diff._milliseconds < 0;
    }

    diffAsHTML(diff) {
        let html = diff.days + '/' + diff.hours + ':' + diff.minutes + ':';
        // Lägg till en nolla om sekunder är mindre än 10.
        // 9 => 09 osv...
        if (diff.seconds < 10) {
            html += '0';
        }
        html += diff.seconds;
        return html;
    }

    render() {
        return this.state.timer;
    }
}