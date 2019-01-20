import React, { Component } from "react";
import "../../css/components/tasks/index.css";

export default class NewCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			value: ""
		};
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();

		const { addCategory, courseID } = this.props;

		fetch("http://localhost:3001/api/category/", {
			method: "POST",
			headers: {
				"Accept": "application/json, text/plain */*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				courseID: courseID,
				name: this.state.value
			})
		})
			.then(res => res.json())
			.then(data => {
				addCategory({
					CategoryID: data.CategoryID,
					Name: this.state.value
				});
			})
			.catch(err => console.log(err));
	};

	handleValueChange(e){
		this.setState({ 
			value: e.target.value
		});
	}

	showForm(e){
		this.setState({ show: true });
	}

	hideForm(e){
		this.setState({ show: false });
	}

	toggleForm(e, currentVisibility){
		this.setState({ show: !currentVisibility });
	}

	render() {
		const { show, value } = this.state;

		return (
			<div>
				<span className="text-muted" id="add-new-category" onClick={e => this.toggleForm(e, show)}>+ Ny kategori</span>
				{show && 
					<form className="form-inline" id="add-new-category-form" onSubmit={e => this.handleSubmit(e)}>
						<div className="form-group">
							<input className="form-control" value={value} placeholder="Skriv ny kategori..." onChange={this.handleValueChange} />
						</div>
						<button type="submit" className="btn btn-primary">Spara</button>
						<button className="btn btn-light" onClick={e => this.hideForm(e)}>Avbryt</button>
					</form>
				}
			</div>
		)
	}
}
