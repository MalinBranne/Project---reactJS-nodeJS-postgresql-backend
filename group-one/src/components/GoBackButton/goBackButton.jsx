import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "../../css/components/GoBackButton/goBackButton.css";


class GoBackButton extends Component {


    goBack = () => {
        const { history } = this.props;

        history && history.goBack();
    }

    render() {

        return (
            <div id="goBackBtn" onClick={this.goBack}>
                <img id="arrow" alt="Back" src={require("../../assets/arrow.png")} />
            </div>
        );
    }
}

export default withRouter(GoBackButton);