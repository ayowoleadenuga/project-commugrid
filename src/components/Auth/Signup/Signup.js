import React, { Component } from 'react'
import { Row, Form, FormGroup, Input, Button, Label, Spinner, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { country_data } from '../../../utils/countries_states_lgas';
import { FaFacebook, FaGoogle, FaUser, FaPhone,
    FaRegEnvelope, FaGlobe, FaMapMarkerAlt, FaLock
} from "react-icons/fa";
import "./Signup.scss"
import { appService } from '../../../utils/app.service'

class Signup extends Component {
    constructor(props) {
        super(props);
          this.state = {
              countries_data: [],
              error: "",
              loading: false,
              successful: false,
                validate: {
                    emailState: null,
                    phoneNumberState: null,
                    passwordState: null
                },
        }
        this.handleChange = this.handleChange.bind(this);
      }
      componentDidMount () {
        this.getContryData()
      }
      getContryData = () => {
        let data = country_data
        this.setState({ countries_data: data})
      }
      formatPhoneNumber = (number) => {
        let num = number.substring(1,11)
        num = '+234' + num;
        return num
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

      validatePhoneNumber = phone => {
        const regex = /^0[7-9]{1}[0-1]{1}[0-9]{8}$/;
        const { validate } = this.state
        if (regex.test(phone)) {
            validate.phoneNumberState = true
        } else {
            validate.phoneNumberState = false
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
        if (name === "phoneNumber") {
            this.validatePhoneNumber(value);
        }
        if (name === "password") {
            this.validatePassword(value);
        }

        await this.setState({
            error: "",
          [ name ]: value,
        });
      }
      formatPhoneNumber = (number) => {
        let num = number.substring(1,11)
        num = '+234' + num;
        return num
      }
      onSubmit = async (e) => {
          e.preventDefault();
        const data = {
            email: this.state.email,
            phoneNumber: this.formatPhoneNumber(this.state.phoneNumber),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            country: this.state.country,
            state: this.state.state,
            password: this.state.password
        }
        await this.setState({ loading: true, error: "" })
       await appService.signup(data)
        .then(resp => {
            if(resp.id) {
                this.setState({ loading: false, successful: true})
            }
        })
        .catch(e => {
            console.log(e)
            this.setState({ error: e, loading: false})
        })
    }
    buttonVisibility = state => {
        return (state.email && state.email !== "" &&
        state.phoneNumber && state.phoneNumber !== "" &&
        state.firstName && state.firstName !== "" &&
        state.lastName && state.lastName !== "" &&
        state.address && state.address !== "" &&
        state.country && state.country !== "" &&
        state.state && state.state !== "" &&
        state.password && state.password !== "" &&
        state.agreement && state.agreement !== "" &&
        state.validate.passwordState && state.validate.emailState && state.validate.phoneNumberState) ? false : true
    }
    render() {
        const { countries_data, validate, loading, error, successful } = this.state;
        const buttonController = this.buttonVisibility(this.state)
        return (
            <div className="signup">
                <Row className="signup_row1">
                    <div className="col-4 signup_social-icons">
                        <div className="p">Signup with</div>
                        <div className="signup-icons"><FaFacebook /><FaGoogle /></div>
                    </div>
                </Row>
                <br/>
                <Row>
                     { !successful ?
                    
                   (<Form className="form" onSubmit={this.onSubmit}>
                        {
                            error !== "" ? (
                                <div className="form-row gh">
                                    <Alert color="success">{error}</Alert>
                                </div>
                            ) : ""
                        }
                        <Row className="form-row">
                            <FormGroup>
                                <FaUser />
                                <Input type="text" placeholder="Firstname"  name="firstName" onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <FaUser />
                                <Input type="text" placeholder="Lastname"  name="lastName" onChange={this.handleChange}/>
                            </FormGroup>   
                        </Row>
                        <Row className="form-row">
                            <FormGroup>
                                <FaMapMarkerAlt />
                                <Input type="text" placeholder="Address"  name="address" onChange={this.handleChange}/>
                            </FormGroup>
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
                                <Input type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                                {!validate.passwordState && validate.passwordState !== null && this.state.password && this.state.password.length > 1 ? (<p style={{color: "red"}}>Min 6</p>) : "" }
                            </FormGroup>
                            <FormGroup>
                                <FaLock />
                                <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange}/>
                            </FormGroup>  
                        </Row>
                        <Row className="form-row">
                            <FormGroup>
                                <FaGlobe />
                                <Input type="select" name="country" onChange={this.handleChange}>
                                    <option>Select country</option>
                                    {countries_data.map(country => (
                                        <option key={country.name}>{country.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <FaGlobe />
                                <Input type="select" name="state" onChange={this.handleChange}>
                                    <option>Select State/Region</option>
                                    {
                                        this.state.country && this.state.country === "Nigeria" ?
                                        (countries_data.map(country => {
                                            return country.states.map(state => (
                                                    <option key={state.id}>{state.name}</option>
                                                ))
                                            })) : ""
                                    }
                                </Input>
                            </FormGroup>  
                        </Row>
                        <Row className="form-row">
                            {
                                this.state.country && this.state.state ? (
                                    <FormGroup>
                                        <FaGlobe />
                                        <Input type="select" name="lga" onChange={this.handleChange}>
                                            <option>Select LGA</option>
                                            { this.state.country === "Nigeria" ?
                                                countries_data.filter(country => country.name === this.state.country)[0]
                                                .states.filter(state => state.name === this.state.state)[0]
                                                .lgas.map( lga => (<option key={lga.id}>{lga.name}</option>)) : ''
                                                
                                            }
                                        </Input>
                                    </FormGroup>
                                ) : ''
                            }
                            
                            <FormGroup>
                                <FaPhone />
                                <Input type="tell" placeholder="Phone Number"  name="phoneNumber" onChange={this.handleChange} />
                                {!this.state.validate.phoneNumberState && this.state.validate.phoneNumberState !== null && this.state.phoneNumber && this.state.phoneNumber.length > 1 ? <p style={{color: "red"}}>Invalid</p> : ''}
                            </FormGroup>
                            
                        </Row>
                        <br />
                        <Row className="form-row">
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox"  name="agreement" onChange={this.handleChange}/>{' '}
                                    I agree to CommuGrid's terms of service and private policy.
                                </Label>
                            </FormGroup>
                        </Row>
                        <Row className="form-buttons">
                            <Button className="btn form-buttons_back" onClick={() => this.props.history.push("/")}>Back</Button>
                            <Button 
                            className="btn form-buttons_signup"
                            disabled={buttonController}>{loading ? (<Spinner />) : "Signup"}</Button>
                        </Row>
                        
                    </Form>
                
                    ) : (
                        <Row className="successful">
                            <h5>Registration Successful</h5>
                            <p>A mail has been sent to your email for verification, however, we don't want to keep you waiting
                                and so you can choose to proceed to login although with limited access to certain featurs until after verification.</p>
                            <div>
                             <Button>PROCEED TO LOGIN</Button>
                            </div>
                            
                        </Row>
                    )}
                </Row>
            </div>
        )
    }
}


export default withRouter(Signup);