import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Background from "../../assets/courses.jpg";

import "../../css/components/Frontpage/index.css";


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }


    componentDidMount() {

        // GET FROM DATABASE
        fetch("http://localhost:3001/api/course")
            .then(res => res.json())
            .then(data => this.setState({ courses: data }))
            .catch(err => console.log(err));
    }


    handleClick = (e, id) => {
        e.preventDefault();
        this.props.history.push("/kurs/" + id);
    }

    coursesLink = (e) => {
        e.preventDefault();
        this.props.history.push("/kurser");
    }



    render() {

        let text = {
            color: "white",
            padding: "10px",
            paddingTop: "20px",
            textAlign: "center",
        };


        return (
            <div id="coursesLink" onClick={e => this.coursesLink(e)}>
                <div id="imgGrid" className="img card card-image" style={{ backgroundImage: `url(${Background})` }}>
                    <div id="layer"></div>

                    <div className="front">
                        <h4 style={text}>KURS ÖVERBLICK</h4>
                    </div>
                </div>
            </div >

        );
    }
}

export default withRouter(Courses);
