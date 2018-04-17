import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import UploadFile from "./dashboard/UploadFile";

class Landing extends Component {
    static propTypes = {
        authenticated: PropTypes.bool
    };

    render() {
        if (this.props.authenticated) {
            return (
                <div className="container text-center">
                    <h2>Welcome to doqman</h2>
                    <UploadFile/>
                </div>
            )
        }
        else {
            return (
                <div className="container text-center">
                    <h3>Please <Link to="/login">Login</Link>/<Link to="/signup">Signup</Link> to continue</h3>
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps)(Landing);
