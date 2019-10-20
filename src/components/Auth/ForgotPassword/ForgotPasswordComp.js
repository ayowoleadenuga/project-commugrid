import React, { Component } from 'react'
import { Row, Form, FormGroup, Input, Button, Spinner, Alert } from 'reactstrap'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from 'react-router-dom'
import { FaRegEnvelope } from "react-icons/fa";
import "./ForgotPassword.scss"
import { alertActions } from '../../../utils/Alert/actions/alert.actions';
import { authActions } from '../Redux/authActions';
import { authService } from '../Redux/authService';

class ForgotPasswordComp extends Component {
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
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        if (name === "email") {
            this.validateEmail(value)
        }
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
            username: this.state.email
        }
        await this.props.login(data)         
        }
        buttonVisibility = state => {
            return (state.email && state.email !== "" &&
            state.password && state.password !== "" && state.validate.passwordState && state.validate.emailState) ? false : true
        }
    render() {
        const { validate, successful } = this.state;
        const buttonController = this.buttonVisibility(this.state)
        const { submitting, error } = this.props;
        return (
          <React.Fragment>
            { !successful ?
            <div className="forgot-password">
                <Row>
                  <div className="message-block">
                    <p>
                    Please provide the email address or phone number you used when you registered your CommuGrid's account.
                    </p>
                    <p>
                      We will send you a link to reset your password.
                    </p>
                  </div>
                  
                </Row>
                {/* <br/> */}
                <Row>
                     <Form className="form" onSubmit={this.onSubmit}>
                        {
                            error !== null ? (
                                <div className="form-row gh">
                                    <Alert color="success">{error.message || "Something went wrong!, please try again."}</Alert>
                                </div>
                            ) : ""
                        }
                        
                        <Row className="form-row">
                            <FormGroup>
                                <FaRegEnvelope />
                                <Input type="email" placeholder="Enter Email Address or Phone number"  name="email" 
                                onChange={this.handleChange}
                                />
                                  {!validate.emailState && validate.emailState !== null && this.state.email && this.state.email.length > 1 ? (<p style={{color: "red"}}>Invalid</p>) : "" }
                            </FormGroup>
                        </Row>
                        
                        <Row className="form-buttons">
                            <Button 
                            className="btn form-buttons_signup"
                            disabled={buttonController}>{submitting ? (<Spinner />) : "Send OTP"}</Button>
                        </Row>
                        
                    </Form>
                </Row>
            </div>
         : 
          <Row className="successful">
              <p>If your email is associated with CommuGrid, you will recieve an email that includes a link to reset your password</p>
              <p>Click the link to reset your password</p>
              <div className="successful_button">
                <Button><Link to="/auth/signin">LOGIN</Link></Button>
              </div>
          </Row>
      }
          </React.Fragment>
          
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
      success: (resp)=>dispatch(authActions.success(resp))
    };
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ForgotPasswordComp));