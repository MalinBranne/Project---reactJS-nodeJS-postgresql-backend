import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainScreen from "./Screens/MainScreen.jsx";
import CoursesScreen from "./Screens/CoursesScreen.jsx";
import TaskScreen from "./Screens/TaskScreen.jsx";
import "./App.css";

class App extends Component {

	render() {
		return (
			<div>
				<Router>
					<div>
						<Route exact path="/" component={MainScreen} />
						<Route exact path="/kurser" component={CoursesScreen} />
						<Route exact path="/kurs/:id" component={TaskScreen} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
