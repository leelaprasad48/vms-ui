import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class logut extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
        localStorage.removeItem("vmail")
    }
    
    render() {
        return (
            <div>
                <h1>You have been logged out</h1>
                <Link to='/'>Login Again</Link>
            </div>
        )
    }
}
