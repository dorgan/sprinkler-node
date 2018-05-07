import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './login.jsx'
import Sprinkler from './sprinkler.jsx'

export default class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/sprinkler' component={Sprinkler}/>
                </Switch>
            </main>
        );
    }
}