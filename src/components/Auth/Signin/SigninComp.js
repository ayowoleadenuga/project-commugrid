import React, { Component } from 'react'
import { Row, Form, FormGroup, Input, Button, Spinner, Alert } from 'reactstrap'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from 'react-router-dom'
import { FaFacebook, FaGoogle, 
    FaRegEnvelope, FaLock
} from "react-icons/fa";
import "./Signin.scss"
import { appService } from '../../../utils/app.service'
import { alertActions } from '../../../utils/Alert/actions/alert.actions';
import { authActions } from '../Redux/authActions';
import { authService } from '../Redux/authService';
// import { history } from '../../../utils/history';

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
            username: this.state.email,
            password: this.state.password
        }
        await this.setState({ loading: true, error: "" })
       await appService.login(data)
        .then(resp => {
            if(resp.token) {
                this.setState({ loading: false, successful: true})
                authService.setToken(resp.token);
            }
            this.props.history.push("/app");
        })
        .catch(e => {
            console.log(e)
            this.setState({ error: e, loading: false})
        })
    }
    buttonVisibility = state => {
        return (state.email && state.email !== "" &&
        state.password && state.password !== "" && state.validate.passwordState && state.validate.emailState) ? false : true
    }
    render() {
        const { validate, loading, error } = this.state;
        const buttonController = this.buttonVisibility(this.state)
        console.log(this.state)
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
                            error !== "" ? (
                                <div className="form-row gh">
                                    <Alert color="success">{error || "Something went wrong!, please try again."}</Alert>
                                </div>
                            ) : ""
                        }
                        
                        <Row className="form-row">
                            <FormGroup>
                                <FaRegEnvelope />
                                <Input type="email" placeholder="Email"  name="email" 
                                onChange={this.handleChange}
                                />
                                  {!validate.emailState && validate.emailState !== null && this.state.email && this.state.email.length > 1 ? (<p style={{color: "red"}}>Invalid</p>) : "" }
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
                            disabled={buttonController}>{loading ? (<Spinner />) : "Login"}</Button>
                        </Row>
                        
                    </Form>
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
      login: bindActionCreators(authActions.login, dispatch),
      clearAlerts: bindActionCreators(alertActions.clear, dispatch)
    };
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SigninComp));