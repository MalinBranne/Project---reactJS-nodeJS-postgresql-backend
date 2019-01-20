import React from "react";
import Task from "../taskInfoObject";

export default function RenderTodo({ tasks }) {

	return (
		tasks.map((task, i) => {
			return (
				<div key={i}>
					<Task key={task.TaskID} task={task} />
				</div>
			);
		})
	);
}