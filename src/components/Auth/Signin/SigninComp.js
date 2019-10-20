import React, { Component } from 'react'
import { Row, Form, FormGroup, Input, Button, Spinner, Alert } from 'reactstrap'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaLock, FaUser
} from "react-icons/fa";
import "./Signin.scss"
import { alertActions } from '../../../utils/Alert/actions/alert.actions';
import { authActions, resetForm } from '../Redux/authActions';
import { authService } from '../Redux/authService';

class SigninComp extends Component {
    constructor(props) {
        super(props);
          this.state = {
              countries_data: [],
              error: "",
              loading: false,
              successful: false,
                validate: {
                    emailState: null,
                    passwordState: null
                },
        }
        this.handleChange = this.handleChange.bind(this);
      }

      validateEmail = e => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
          if (emailRex.test(e)) {
            validate.emailState = true
          } else {
            validate.emailState = false
          }
          this.setState({ validate })
        }

    validatePassword = password => {
        const { validate } = this.state
        if (password.length >= 6 ) {
            validate.passwordState = true
        } else {
            validate.passwordState = false
        }
        this.setState({ validate })
        }
    
      handleChange = async (event) => {
          this.props.clearError()
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        if (name === "password") {
            this.validatePassword(value);
        }
        await this.setState({
            error: "",
          [ name ]: value,
        });
      }

      handleSubmit = data => {
        authService.login(data);
      };

      onSubmit = async (e) => {
          e.preventDefault();
        const data = {
            username: this.state.email,
            password: this.state.password
        }
        await this.props.login(data)         
        }
        buttonVisibility = state => {
            return (state.email && state.email !== "" &&
            state.password && state.password !== "" && state.validate.passwordState) ? false : true
        }
    render() {
        const { validate } = this.state;
        const buttonController = this.buttonVisibility(this.state)
        const { submitting, error } = this.props;
        return (
            <div className="signin">
                <Row className="signin_row1">
                    <div className="signin_row1-register">
                        <p>Not yet registered? <Link to="/auth">Register</Link></p>
                    </div>
                    <div className="spacer" />
                    <div className="signin_social-icons">
                        <div className="p">Signup with</div>
                        <div className="signin-icons"><FaFacebook /><FaGoogle /></div>
                    </div>
                </Row>
                <br/>
                <Row>
                     <Form className="form" onSubmit={this.onSubmit}>
                        {
                            error !== null && error.length ? (
                                <div className="form-row gh">
                                    <Alert color="success">{error || "Something went wrong!, please try again."}</Alert>
                                </div>
                            ) : ""
                        }
                        
                        <Row className="form-row">
                            <FormGroup>
                                <FaUser />
                                <Input type="text" placeholder="Email/Phone number"  name="email" 
                                onChange={this.handleChange}
                                />
                                  {/* {!validate.emailState && validate.emailState !== null && this.state.email && this.state.email.length > 1 ? (<p style={{color: "red"}}>Invalid</p>) : "" } */}
                            </FormGroup>
                        </Row>

                        <Row className="form-row">
                            <FormGroup>
                                <FaLock />
                                <Input type="password" placeholder="Enter Password" name="password" onChange={this.handleChange}/>
                                {!validate.passwordState && validate.passwordState !== null && this.state.password && this.state.password.length > 1 ? (<p style={{color: "red"}}>Min of 6</p>) : "" }
                            </FormGroup>
                        </Row>
                        
                        <Row className="form-buttons">
                            <Button 
                            className="btn form-buttons_signup"
                            disabled={buttonController}>{submitting ? (<Spinner />) : "Login"}</Button>
                        </Row>
                        
                    </Form>
                    <Row>
                        <p className="forgot-P">Forgot Password? <Link to="/auth/forgot-password">Click here</Link></p>
                    </Row>
                    <br />
                    {/* <Row>
                        <p className="forgot-P">Click here to login as a Merchant</p>
                    </Row> */}
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { submitting, submitted, request, response, error } = state.auth;
    const { type, message } = state.alert;
  
    return {
      submitting,
      submitted,
      request,
      response,
      error,
      type,
      message
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (data)=>dispatch(authActions.login(data)),
      clearAlerts: bindActionCreators(alertActions.clear, dispatch),
      success: (resp)=>dispatch(authActions.success(resp)),
      clearError: ()=>dispatch(resetForm()),
    };
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SigninComp));