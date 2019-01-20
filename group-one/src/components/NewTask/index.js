import React, { Component } from 'react';

export default class NewTask extends Component {
    constructor(props){
        super(props);

        this.state = {
            task: {
                note: "",
                courseID: this.props.CourseID,
                categoryID: this.props.CategoryID,
                deadline: "",
                title: "",
                done: false
            },
            showForm: false
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }

    handleTitleChange(event){
        const newTitle = event.target.value;
        this.setState((state) => {
            let newState = JSON.parse(JSON.stringify(state));
            newState.task.title = newTitle;
            return newState;
        });
    };

    handleDeadlineChange(event){
        const newDeadline = event.target.value;
        this.setState((state) => {
            let newState = JSON.parse(JSON.stringify(state));
            newState.task.deadline = newDeadline;
            return newState;
        });
    };

    handleNoteChange(event){
        const newNote = event.target.value;
        this.setState((state) => {
            let newState = JSON.parse(JSON.stringify(state));
            newState.task.note = newNote;
            return newState;
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const newTask = this.state.task;
        
        fetch('http://localhost:3001/api/task/', {
            method: "POST",
			headers: {
				"Accept": "application/json, text/plain */*",
				"Content-Type": "application/json"
			},
             body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                let handleToUpdate = this.props.handleToUpdate;
                handleToUpdate(newTask, json)
            })
            .catch(err => console.log(err));

        this.hideForm();
    };

    showForm = () => {
        this.setState({
            showForm: true
        });
    }

    hideForm = () => {
        this.setState({
            showForm: false
        });
    }

    render() {
        const styling = {
            padding: '1em 0'
        };

        const text = {
        	color: 'gray',
			fontSize: '16px'
		};

        return (
            <div>
                <div>
                    {!this.state.showForm ? (
                        <button className="btn nyttArende" style={text} onClick={this.showForm}>+ Nytt ärende</button>
                    ) : (
                        <button className="btn btn-lg btn-md" onClick={this.hideForm}>x</button>
                    )}
                </div>
                    {this.state.showForm && (
                        <div className="container" style={styling}>
                            <h4>Skapa nytt ärende</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label> Titel: </label>
                                    <input type="text" className="form-control" required value={this.state.title} onChange={this.handleTitleChange}/>
                                </div>
                                <div className="form-group">
                                    <label> Deadline: </label>
                                    <input type="date" className="form-control" required onChange={this.handleDeadlineChange} value={this.state.deadline} />
                                </div>
                                <div className="form-group">
                                    <label> Anteckning: </label>
                                    <input type="text" className="form-control" onChange={this.handleNoteChange} value={this.state.note} />
                                </div>
                                <input type="submit" className="btn btn-lg btn-success" name="Add new task" value="Skapa" />
                                <button className="btn btn-lg btn-light" onClick={this.hideForm}>Stäng</button>

                            </form>
                        </div>
                    )}
            </div>
        )
    }
}
