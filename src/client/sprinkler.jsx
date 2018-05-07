import React from 'react'
import { Link } from 'react-router-dom'

class Sprinkler extends React.Component {
    render() {
      return <div>SECOND PAGE<Link  className="waves-effect waves-light btn" to="/">back</Link></div>
    }
}

export default Sprinkler