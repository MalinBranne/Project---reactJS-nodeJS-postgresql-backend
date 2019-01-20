import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class courseItem extends Component {

	handleClick(e, id) {
		this.props.history.push("/kurs/" + id);
	}

	render() {
		const { course, id, total, doneTotal } = this.props;
		const progress = doneTotal / total * 100;

		return (
			<tr onClick={e => this.handleClick(e, id)}>
				{/* Course title */}
				<td>{course}</td>
				{/* Progress */}
				<td>{doneTotal || "0"} av {total || "0"}</td>
				{/* Progress bar */}
				<td>
					<div className="progress course-list-item-progress">
						<div className="progress-bar bg-success" role="progressbar" style={{ width: progress + "%" }} aria-valuenow={doneTotal} aria-valuemin="0" aria-valuemax={total}></div>
					</div>
				</td>
				<td><button className="btn btn-secondary">Ändra namn</button></td>
				<td><button className="btn btn-danger">Ta bort</button></td>
			</tr>
		);
	}
}

export default withRouter(courseItem);