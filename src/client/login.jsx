import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Icon, Row, Input} from 'react-materialize'

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <Row>
                <Input id="username" s={12} label="Username" onChange={this.handleChange} value={this.state.username} />
            </Row>
            <Row>
                <Input id="password" s={12} label="Password" type="password" onChange={this.handleChange} />
            </Row>
            <Row>
                <p align="center"><Button waves="green">Login</Button></p>
            </Row>
        </form>
      )
    }
}