import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Background from "../../assets/report.jpg";


import "../../css/components/Frontpage/index.css";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            menuStatus: false
        };
    }


    componentDidMount() {

        // GET FROM DATABASE
        fetch("http://localhost:3001/api/course")
            .then(res => res.json())
            .then(data => this.setState({ courses: data }))
            .catch(err => console.log(err));

    }

    toggleMenu = () => {

        let newStatus = !this.state.menuStatus;
        this.setState({
            menuStatus: newStatus
        })
    }


    handleClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        this.props.history.push("/kurs/" + id);
    }


    render() {


        let text = {
            color: "white",
            padding: "10px",
            textAlign: "center"
        };

        return (

            <div id="sidebar" className="card-info">
                <div className="card-title text-center" style={{ backgroundImage: `url(${Background})` }}>
                    <h4 id="layer" style={text}>MENY</h4>
                </div>
                <div className="card-body">

                    <ul>
                        <li>
                            <h6 onClick={this.toggleMenu}>AKTIVA KURSER</h6>
                            <ul>
                                {
                                    this.state.menuStatus && this.state.courses ? this.state.courses.map(c =>
                                        <li key={c.CourseID} onClick={e => this.handleClick(e, c.CourseID)}><p>{c.Course}</p></li>
                                    ) : null
                                }
                            </ul>
                        </li>
                        <li><h6>STUDERANDE</h6></li>
                        <li><h6>LÄRARE</h6></li>
                        <li><h6>RAPPORTER</h6></li>
                        <li><h6>KALENDER</h6></li>
                        <li><h6>MITT KONTO</h6></li>
                    </ul>
                </div>
            </div>

        );
    }
}


export default withRouter(Sidebar);