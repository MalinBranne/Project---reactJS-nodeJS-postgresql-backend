import React, { Component } from "react";
import Background from "../../assets/report.jpg";


import "../../css/components/Frontpage/index.css";



class Reporting extends Component {

	render() {

		let text = {
			color: "white",
			padding: "10px",
			paddingTop: "20px",
			textAlign: "center",
			cursor: "pointer"
		};

		return (
			<div id="report">
				<div id="imgGrid" className="img card card-image" style={{ backgroundImage: `url(${Background})` }}>
					<div id="layer"></div>

					<div className="front">
						<h4 style={text}>RAPPORTERING</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default Reporting;
