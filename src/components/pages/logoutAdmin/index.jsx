import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class logoutAdmin extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("jwtTokenAdmin")
        localStorage.removeItem("amail")
    }
    
    render() {
        return (
            <div style={{height:"100vh" ,padding:"10%",backgroundImage: "url('https://images.pexels.com/photos/1906440/pexels-photo-1906440.jpeg?cs=srgb&dl=background-conceptual-data-1906440.jpg&fm=jpg')",backgroundPosition:"center",backgroundSize:"cover" }}>
                <h1>You have been logged out</h1>
                <Link to='/'>Login Again</Link>
            </div>
        )
    }
}
