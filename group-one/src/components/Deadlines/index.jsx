import React, { Component } from 'react';
import RenderTodo from "./renderTodo";

import "../../css/components/Deadlines/style.css";


export default class Deadlines extends Component {

    state = {
        tasks: [

        ]
    };

    componentDidMount() {
        fetch('http://localhost:3001/api/task')
            .then(res => {
                res.json()
                    .then(body => this.setState({ tasks: body }))
            })
            .catch(err => alert(err));
    }


    // Calculate how many days between today and the deadline
    // returns the value in days.
    diffDates = (dateOne, dateTwo) => {
        let oneDay = 1000 * 60 * 60 * 24;

        let dateTwoMS = Date.parse(dateTwo);

        let differenceMS = dateOne - dateTwoMS;
        return Math.round(differenceMS / oneDay + 1);

    };

    render() {

        // Get all the tasks.
        let taskList = this.state.tasks;

        // Are there tasks? Cool - let's do this.
        if (taskList) {
            let now = new Date();

            // Filter out the tasks that are due in 3 days
            let upcomingDeadlines = taskList.filter((task, i) => {
                let justDate = task.Deadline.split('T')[0];
                let date = Date.parse(justDate);
                let difference = this.diffDates(date, now);
                return difference > -1 && difference < 4 && !task.Done;
            });

            // Filter out all the tasks that are passed deadlines
            let passedDeadlines = taskList.filter(task => Date.parse(task.Deadline) < now && !task.Done);


            return (
                <div id="deadlines">
                    <h1 className="text-center">ÖVERHÄNGANDE UPPGIFTER</h1>

                    <div className="upcoming">
                        <h3>Uppkommande deadlines</h3>
                        <div className="d-flex">
                            <RenderTodo tasks={upcomingDeadlines} status={'text-warning'} />
                        </div>
                    </div>

                    <div className="passed">
                        <h3>Passerade deadlines</h3>
                        <div className="d-flex">
                            <RenderTodo tasks={passedDeadlines} status={'text-danger'} />
                        </div>
                    </div>

                </div>
            )

        }

    }
}