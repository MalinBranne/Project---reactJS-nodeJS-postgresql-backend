
import React, { Component } from "react";
import "./../css/components/Frontpage/index.css";
import "./../App.css";
import Sidebar from "../components/Frontpage/Sidebar";
import Deadlines from "../components/Deadlines";
import Reporting from "../components/Frontpage/Reporting";
import StudentEnquiries from "../components/Frontpage/StudentEnquiries";
import Courses from "../components/Frontpage/Courses";


class MainScreen extends Component {


	render() {
		return (
			<div id="mainScreen">
				<Sidebar />
				<div id="midGrid">
					<Deadlines />
					<div id="links" className="row">
						<Courses />
						<Reporting />
						<StudentEnquiries />
					</div>
				</div>
			</div>
		);
	}
}

export default MainScreen;