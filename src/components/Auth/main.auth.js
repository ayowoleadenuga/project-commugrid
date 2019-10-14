import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./auth.scss"
import { changeCheckedValue, changeDisableStatus } from './Redux/authActions';

class MainAuth extends Component {
    componentDidMount() {
        this.props.changeCheckedValue("");
        this.props.changeDisableStatus();
    }
    handleCheck = e => {
        if (e.target.checked) {
            const id = e.target.id;
            if(id === "roundedOne") {
                document.getElementById("roundedTwo").disabled = true ;
                document.getElementById("roundedThree").disabled = true;
            } else if(id === "roundedTwo") {
                document.getElementById("roundedOne").disabled = true ;
                document.getElementById("roundedThree").disabled = true;
            } else if(id === "roundedThree") {
                document.getElementById("roundedOne").disabled = true ;
                document.getElementById("roundedTwo").disabled = true;
            }
            this.props.changeCheckedValue(e.target.value);
            this.props.changeDisableStatus();
        } else {
            const id = e.target.id;
            if(id === "roundedOne") {
                document.getElementById("roundedTwo").disabled = false ;
                document.getElementById("roundedThree").disabled = false;
            } else if(id === "roundedTwo") {
                document.getElementById("roundedOne").disabled = false ;
                document.getElementById("roundedThree").disabled = false;
            } else if(id === "roundedThree") {
                document.getElementById("roundedOne").disabled = false ;
                document.getElementById("roundedTwo").disabled = false;
            }
            this.props.changeCheckedValue("");
            this.props.changeDisableStatus();
        }
    } 
    handlePageChange = () => {
        this.props.history.push("/auth/signup");
    }
    render() {
        const { authState } = this.props
        return (
            <div className="main__auth">
                <div className="main__auth-text">
                    <p>Join as an:</p>
                </div>
                <form className="main__auth-container" id="authForm">
                    <div className="main__auth-container-card">
                        <p className="head">Energy User</p>
                        <p className="body">I am searching for clean renewable energy for my personal use.</p>
                        <div className="roundedOne">
                            <input type="checkbox" value="energy_user" id="roundedOne" name="energy" onChange={this.handleCheck} />
                            <label htmlFor="roundedOne"></label>
                        </div>
                    </div>
                    <div className="main__auth-container-card">
                        <p className="head">Equipment Supplier</p>
                        <p className="body">I am searching for clean renewable energy for my personal use.</p>
                        <div className="roundedOne">
                            <input type="checkbox" value="equipment_supplier" id="roundedTwo" name="equipment" onChange={this.handleCheck} />
                            <label htmlFor="roundedTwo"></label>
                        </div>
                    </div>
                    <div className="main__auth-container-card">
                        <p className="head">Administrator</p>
                        <p className="body">I am searching for clean renewable energy for my personal use.</p>
                        <div className="roundedOne">
                            <input type="checkbox" value="admin" id="roundedThree" name="admin" onChange={this.handleCheck} />
                            <label htmlFor="roundedThree"></label>
                        </div>
                    </div>

                </form>
                <br />
                <div className="main__auth-buttons">
                  <Button className="btn main__auth-buttons_back" onClick={() => {this.props.history.push("/")}}>Back</Button>
                  <Button className="btn main__auth-buttons_next" disabled={authState.disable} onClick={this.handlePageChange}>Next</Button>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeCheckedValue: (value) => dispatch(changeCheckedValue(value)),
    changeDisableStatus: () => dispatch(changeDisableStatus())
});
const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(withRouter(MainAuth));
