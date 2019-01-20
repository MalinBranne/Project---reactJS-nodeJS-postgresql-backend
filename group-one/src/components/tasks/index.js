import React, { Component } from "react";
import Task from "../taskInfoObject";
import NewCategory from "./newCategory";
import GoBackButton from "../GoBackButton/goBackButton";

import "../../css/components/NewTask/newTask.css";
import NewTask from "../NewTask";

class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			course: undefined,
			categories: [],
			tasks: []
		};

		this.addCategory = this.addCategory.bind(this);
		this.handleToUpdate = this.handleToUpdate.bind(this);
	}

	addCategory(category){
		this.setState((state) => ({
			categories: [...state.categories, category]
		}));
	}

	handleToUpdate = (newTask, resp) => {
        let errands = this.state.tasks.slice();
        errands.push({
			 Note: newTask.note,
			 CategoryID: newTask.categoryID,
			 TaskID: resp.taskID,
			 Deadline: newTask.deadline,
			 Title: newTask.title,
			 Done: false 
         });
         this.setState({
             tasks: errands, 
        });
	}

	render() {
		const { courseID } = this.props;
		const { loading, course, categories, tasks } = this.state;

		const doneTotal = tasks && tasks.length > 0 ? tasks.filter(t => t.Done).length : null;

		const total = tasks && tasks.length;
		const progress = doneTotal / total * 100 || 0;


		return (
			<div className="Grid">
				<GoBackButton />
				{loading ? (
					<div className="container">Laddar kurs...</div>
				) : course ? (
					<div id="taskScreen" className="container">
						<h1 className="display-2">{course.Course}</h1>
						<NewCategory addCategory={this.addCategory} courseID={courseID} />
						{/* Course progress bar */}
						<div className="progress" style={{ height: "30px", margin: "5px" }}>
							<div className="progress-bar bg-success" role="progressbar" style={{ width: progress + "%" }} aria-valuenow={doneTotal} aria-valuemin="0" aria-valuemax={total}>{Math.round(progress)}%</div>
						</div>
						{/* Subcategory columns */}
						<div className="row">
							{categories ? categories.map(c => {

								const subtasks = tasks && tasks.length > 0 ? tasks.filter(t => t.CategoryID === c.CategoryID) : null;
								return (
									<div key={c.CategoryID} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
										<h3>{c.Name}</h3>

										<NewTask CourseID={courseID} CategoryID={c.CategoryID} handleToUpdate={this.handleToUpdate} />
										<div className="flex-column align-items-start">
											{subtasks && subtasks.length > 0 ? subtasks.map(t => <Task key={t.TaskID} task={t} course={course.Course} />) : null}
										</div>
									</div>
								);
							}) : null}
						</div>
					</div>
				) : (
					<div className="container">No course with id {courseID} exists.</div>
				)
				}
			</div>
		);
	}

	componentDidMount() {
		const { courseID } = this.props;

		const urls = [
			"http://localhost:3001/api/course/" + courseID,
			"http://localhost:3001/api/category?courseID=" + courseID,
			"http://localhost:3001/api/task?courseID=" + courseID
		];

		Promise.all(urls.map(url =>
			fetch(url)
				.then(res => res.json())
				.catch(err => console.log(err))
		))
			.then(data => {
				const course = data[0];
				const categories = data[1];
				const tasks = data[2];

				this.setState({
					course, categories, tasks,
					loading: false
				});
			})
			.catch(err => console.log(err));
	}
}

export default Courses;
