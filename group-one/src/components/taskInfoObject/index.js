import React, { Component, Fragment } from "react";
import '../../css/components/taskEditAndDelete/TaskModal.css';

class taskInfoObject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			edit: false,
			task: this.props.task,
			course: this.props.course
		};
	}
  
	openTaskModal = (e, id) => {
		document.getElementById(`task${id}`).style.display = 'block';
		document.getElementById(`modal-backdrop-custom${id}`).style.display = 'block';
	}
  
	closeTaskModal = (e, id) => {
		document.getElementById(`task${id}`).style.display = 'none';
		document.getElementById(`modal-backdrop-custom${id}`).style.display = 'none';
	}
	  
	openEditTask = (e) => {
		e.preventDefault();
		this.setState({
			edit: true
		});
	};
  
	saveTaskEdit = (e, id) => {
		e.preventDefault();
		let val1 = document.getElementById(`taskTitel${id}`).value;
		let val2 = document.getElementById(`taskNote${id}`).value;
		let val3 = document.getElementById(`taskDeadline${id}`).value;

		let taskCopy = JSON.parse(JSON.stringify(this.state.task))
		taskCopy.Title = val1;
		taskCopy.Note = val2;
		taskCopy.Deadline = val3;
		this.setState({
			edit: false,
			task: taskCopy 
		});

		// Uppdaterar en task med hjälp av taskID
		fetch(`http://localhost:3001/api/task/${id}`, {
			method: "POST",
			headers: {
				"Accept": "application/json; test/plain */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: val1, note: val2, deadline: val3, done: taskCopy.Done })
		});
	};
  
	closeEditTask = (e) => {
		e.preventDefault();
		this.setState({
			edit: false
		});
	};
		
	deleteTask = (e, id) => {
		e.preventDefault();
		document.getElementById(`task${id}`).style.display = 'none';
		document.getElementById(`modal-backdrop-custom${id}`).style.display = 'none';

		this.setState({
			visible: false
		})

		// Tar bort en task med hjälp av taskID
		fetch(`http://localhost:3001/api/task/${id}`, {
			method: "DELETE",
			headers: {
				"Accept": "application/json; test/plain */*",
				"Content-Type": "application/json",
			}
		});
	}
  
	markTaskDone = (e, id) => {
		let taskCopy = JSON.parse(JSON.stringify(this.state.task))

		taskCopy.Done = !this.state.task.Done;
		this.setState({
			task: taskCopy
		});

		/* 
			Uppdaterar taskens egenskap(done) när användaren klickar på den grafiska indikikatorn.
		*/
		fetch(`http://localhost:3001/api/task/${id}`, {
			method: "POST",
			headers: {
				"Accept": "application/json; test/plain */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: taskCopy.Title, note: taskCopy.Note, deadline: taskCopy.Deadline, done: taskCopy.Done })
		});
	}
	
	toReadableDate(dateString){
		return new Date(dateString).toLocaleDateString("sv-SE");
	}

	getCardColor(deadline, done){
		let cardColor = "card ";
		if(done)
			cardColor += "bg-success text-white";
		else{
			let today = new Date();
			let date = new Date();
			let warningPeriod = new Date(date.setDate(date.getDate() + 7));
			if(deadline < today.toISOString())
				cardColor += "bg-danger text-white";
			else if(deadline < warningPeriod.toISOString())
				cardColor += "bg-warning text-white";
			else
				cardColor += "bg-light";
		}

		return cardColor;
	}

	render() {
		const { course, task, edit, visible } = this.state;
		const id = task.TaskID;

		return (
			<Fragment>
			{visible ? (
				<Fragment>
					<div className={this.getCardColor(task.Deadline, task.Done)} onClick={e => this.openTaskModal(e, id)}>
					<div className="card-body">
						<h5 className="card-title">{task.Title}</h5>
						<p className="card-text">Görs senast {this.toReadableDate(task.Deadline)} {task.Done && " (Avklarat)"}</p>
					</div>
				</div>
			
				<div className="modal task-modal" data-backdrop="false" id={`task${id}`} tabid="-1" role="dialog" aria-labelledby={`${id}Label`} aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-body">
								<button type="button" className="close" data-dismiss="modal" onClick={e => this.closeTaskModal(e, id)}>
									<span aria-hidden="true">&times;</span>
								</button>
								<div className="row">
									<div className="col-md-12 product_content">
										{edit ? (
											<Fragment>
												<div className="headings">
													<h2><input type="text" id={`taskTitel${id}`} defaultValue={task.Title} /></h2>
													<p className="modal-kurs cursor-none">
														Tillhör kursen {course}
													</p>
												</div>
												<h5 className="modal-text cursor-none">Beskrivning</h5>
												<p className="modal-text">
													<textarea id={`taskNote${id}`} rows="5" cols="55" defaultValue={task.Note} />
												</p>
												{task.Done ? (
													<p className="modal-text">
														<span className="cursor-none">Datum:</span> <input type="date" 
															defaultValue={this.toReadableDate(task.Deadline)} min={this.toReadableDate(task.Deadline)} max={this.toReadableDate(task.Deadline)} id={`taskDeadline${id}`} required="required" /> Klar</p>
												): (
													<p className="modal-text">
														<span className="cursor-none">Datum:</span> <input type="date" 
															defaultValue={this.toReadableDate(task.Deadline)} min={this.toReadableDate(task.Deadline)} id={`taskDeadline${id}`} required="required" /></p>
												)}
												<div className="d-flex">
													<button className="btn btn-success" onClick={e => this.saveTaskEdit(e, id)}>Spara</button>
													<button type="button" className="close closeEdit" onClick={e => this.closeEditTask(e, id)}>
														<span aria-hidden="true">&times;</span>
													</button>
													<button className="btn btn-danger ml-auto" data-toggle="modal" data-target={`#confirm-delete${id}`}>Ta bort</button>
												</div>
											</Fragment>
										) : (
											<Fragment>
												<div className="headings">
													<h2 onClick={e => this.openEditTask(e, id)} className="cursor-text">{task.Title}</h2>
													<p className="modal-kurs cursor-none">
														Tillhör kursen {course}
													</p>
												</div>
												<h5 className="modal-text cursor-none">Beskrivning <span className="redigera-text" onClick={e => this.openEditTask(e, id)}>Redigera</span></h5>
												<p className="modal-text cursor-pointer" onClick={e => this.openEditTask(e, id)}>
													{task.Note}
												</p>
												{task.Done ? (
													<p className="done-task"><strong className="modal-text">Task avklarades</strong> - {this.toReadableDate(task.Deadline)}</p>
												): (
													<p onClick={e => this.openEditTask(e, id)}><strong className="modal-text">Datum för deadline</strong> - {this.toReadableDate(task.Deadline)}</p>
												)}
												<div className="d-flex">
													<button className="btn btn-danger" data-toggle="modal" data-target={`#confirm-delete${id}`}>Ta bort</button>
													<button type="button" className="btn btn-default" data-dismiss="modal" onClick={e => this.closeTaskModal(e, id)}>Avbryt</button>
													<div className="ml-auto">
														<input style={{display: "none"}} type="checkbox" id={"tick" + id} defaultChecked={task.Done} onChange={e => this.markTaskDone(e, id)} />
														<label htmlFor={"tick" + id} className="tick_label"></label>
													</div>
												</div>
											</Fragment>
										)
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="modal modal-confirm-delete" id={`confirm-delete${id}`} tabid="-1" role="dialog" aria-labelledby={`confirm-delete${id}Label`} aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">

							<div className="modal-header">
								<h4 className="modal-title">Bekräfta borttagning</h4>
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							</div>

							<div className="modal-body">
								<p>Du är påväg att ta bort tasken --> {task.Title}</p>
								<p>Vill du fortsätta?</p>
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Avbryt</button>
								<button className="btn btn-danger" data-dismiss="modal" onClick={e => this.deleteTask(e, id)}>Ta bort</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal-backdrop-custom" id={`modal-backdrop-custom${id}`}></div>
				</Fragment>
				) : (
					null
				)}
			</Fragment>
		);
	}
}

export default taskInfoObject;