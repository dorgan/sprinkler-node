import React from 'react'
import {Link} from 'react-router-dom'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="row">                
                    <div className="col s6">
                        <Link to="/login" className="waves-effect waves-light btn">Login</Link>
                    </div>
                    <div className="col s12">
                        <Link to="/2" className="waves-effect waves-light btn">page2</Link>
                    </div>
                </div>
            </header>
        );
    }
}