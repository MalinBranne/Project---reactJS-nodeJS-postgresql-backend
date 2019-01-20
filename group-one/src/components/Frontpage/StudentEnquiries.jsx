import React, { Component } from "react";
import Background from "../../assets/student.jpg";

import "../../css/components/Frontpage/index.css";


class StudentEnquiries extends Component {


	render() {

		let text = {
			color: "white",
			padding: "10px",
			paddingTop: "20px",
			textAlign: "center",
			cursor: "pointer"

		};

		return (
			<div id="studentEnq">
				<div id="imgGrid" className="img card card-image" style={{ backgroundImage: `url(${Background})` }}>
					<div id="layer"></div>

					<div className="front">
						<h4 style={text}>STUDENTÄRENDEN</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default StudentEnquiries;
