import React, { Component } from "react";

export default class extends Component {

	saveCourse(e, addCourse) {

		let title = document.getElementById("newCourseTitle").value;
		let course = {
			course: title
		};

		//Skapa new coure
		fetch("http://localhost:3001/api/course",
			{
				method: "POST",
				headers: {
					"Accept": "application/json, text/plain */*",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(course)
			})
			.then((res) => res.json())
			.then((data) => {
				addCourse({
					CourseID: data.CourseID,
					Course: title,
					totalTasks: 0,
					completedTasks: 0
				}); 	// calling the function to update state received as props from courses.jsx
			})
			.catch((err) => console.log(err));

		document.getElementById("newCourseTitle").value = "";
	}

	render() {
		const { itemCount, addCourse } = this.props;

		return (
			<div className="status-bar">
				<span>Totalt {itemCount}</span>
				<button type="button" className="btn" data-toggle="modal" data-target="#exampleModal">
					<i className="fas fa-plus"></i>
				</button>

				{/* Add course modal */}
				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Lägg till Kurs</h4>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<input id="newCourseTitle" placeholder="Kurs namn" />
							</div>
							<div className="modal-footer">
								<button className="btn btn-success" id="saveNewCourse" onClick={e => this.saveCourse(e, addCourse)}>Spara</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
