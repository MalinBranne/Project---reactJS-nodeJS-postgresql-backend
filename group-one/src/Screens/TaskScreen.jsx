import React, { Component } from "react";

import Tasks from "../components/tasks";

class TaskScreen extends Component {

	
	render() {
		const { id } = this.props.match.params;

		return (
			<div>
				<Tasks courseID={id} />
			</div>
		);
	}
}

export default TaskScreen;