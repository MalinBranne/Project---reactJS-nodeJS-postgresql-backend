import React, { Component } from "react";
import CourseItem from "./courseItem";
import StatusBar from "./statusBar";
import GoBackButton from "../GoBackButton/goBackButton"


import "../../css/components/Courses/courses.css";


class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: []
		};
	}

	componentDidMount(){
		// GET FROM DATABASE
		const urls = [
			"http://localhost:3001/api/course?includeTasks=true",
			"http://localhost:3001/api/task"
		];

		Promise.all(urls.map(url =>
			fetch(url)
			.then(res => res.json())
			.catch(err => console.log(err))
		))
		.then(data => {
			const courseData = data[0];
			const taskData = data[1];

			for(let i = 0; i < courseData.length; i++){
				courseData[i].TotalTasks = courseData[i].Tasks.length;
				courseData[i].CompletedTasks = courseData[i].Tasks.reduce((acc, currID) => {
					const currTask = taskData.find(task => task.TaskID === currID);
					return (currTask.Done ? acc + 1 : acc);
				}, 0);
				delete courseData[i].Tasks;
			}

			this.setState({
				courses: courseData
			})
		});
	}


	addCourse = (course) => {
		this.setState((state, props) => ({
			courses: [...state.courses, course]
		}));

	}


	render() {
		const { courses } = this.state;
		const noCourses = !courses || courses.length === 0;

		return (
			<div className="Grid">
				<GoBackButton id="goBackDiv" />
				<div>
					<StatusBar itemCount={courses.length} addCourse={this.addCourse} />
					<div>
						{noCourses ?
							<div id="noCourses">
								<h3>Inga kurser inlagda</h3>
							</div>
							:
							<div id="courseList">
								<table className="table table-striped table-hover">
									<thead>
										<tr>
											<th>Kurs</th>
											<th>Avklarat</th>
											<th></th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{Array.from(courses).map(c => <CourseItem key={c.CourseID} course={c.Course} id={c.CourseID} total={c.TotalTasks} doneTotal={c.CompletedTasks}></CourseItem>)}
									</tbody>
								</table>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Courses;
