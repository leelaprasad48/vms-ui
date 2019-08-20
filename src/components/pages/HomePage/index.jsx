import React, {Component} from 'react'
import { Button, Divider, Form, Grid, Segment, Header, Icon ,Image, GridRow} from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import URLs from '../../../config';

import GoogleLogin from 'react-google-login'



//Class and State Declarations
class Login extends Component{

    constructor(props) {
        super(props);
        this.state = { vmail : '' };
        this.state = { vpass : '' };
        this.state = { aemail : '' };
        this.state = { status : '0' };  
      }
      
      state = {
        redirect: false
      }
      state = {
        redirect2: false
      }
      
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/app/VendorHome' />
        }
      }

      renderRedirect2 = () => {
        if (this.state.redirect) {
          return <Redirect to='/admin/adminHome' />
        }
      }

      mySubmitHandler = (event) => {
        event.preventDefault();


      //Sending Vendor Email & Password to backend for verification, setting Vmail & JWT in local storage.  
        axios.post(URLs.baseURL+'/vendor/vmail',this.state).then(response=>
        {   
            const token=response.data;
            localStorage.setItem("jwtToken",token)

            localStorage.setItem("vmail",this.state.vmail)

              this.setState({
                redirect: true
              })     
        })
        
      }

      //Fetching response from Google after successful login.
      responseGoogle= (response) => {
        
        console.log(response.profileObj)
        var email=response.profileObj.email;
        var adminDetails = {};

        //Extracting email from Google's response and assigning it to local variiable "email".
        adminDetails['email'] =  email;
        axios.post(URLs.baseURL+'/admin/email',adminDetails).then(response=>
        {   
            // alert(JSON.stringify(response.data));
            //Extracting Status from back-End response.
            this.setState({status : response.data[0].status })
            
            //Redirecction to Super Admin page.
            if(this.state.status==2){
              alert("SuperAdmin")
            }
            //Redirection to Admin Home.
            else if(this.state.status==1)
                        {
                          //Sending email to backend to get JWT.                        
                          axios.post(URLs.baseURL+'/admin/token',adminDetails).then(response=>
                            {   
                                const token=response.data;
                                localStorage.setItem("jwtTokenAdmin",token)
                    
                                localStorage.setItem("amail",email)
                                this.props.history.push({
                                  pathname: '/admin/adminHome'
                                }) 
                            })
                            
                            
                         //If the Admin's request is pending for Approval by super admin.   
                        }
              else if(this.state.status==0)
                        {
                         alert("You are yet to be authorized as Admin by Super Admin.")
                        } 
            
      //If the Admin's Details do not exist in DB - Post the email as request with default status as 0(Pending Approval)
        })
    
        .catch(error => {
          console.log('ERROR', error)
          console.log(error.response)
          axios.post('https://0d27963e.ngrok.io/admin/saveadmin',adminDetails)
          alert("Your Request for Admin Access has been submitted to the SuperAdmin.!")
        })
        
        console.log(adminDetails);
      } 

  
      myChangeHandler = (event) => {
        this.setState({vmail: event.target.value});
      }
  
      myChangeHandler2 = (event) => {
          this.setState({vpass: event.target.value});
      }
      
     
    render(){
      
        
        return(
      //  Vendor Login Form.   
<div style={{height:"100vh" ,padding:"10%",backgroundImage: "url('https://images.pexels.com/photos/1906440/pexels-photo-1906440.jpeg?cs=srgb&dl=background-conceptual-data-1906440.jpg&fm=jpg')",backgroundPosition:"center",backgroundSize:"cover" }}>
  
    <Grid textAlign='center' verticalAlign='middle' >
      <Grid.Row>
      

        <Form inverted size='large' style={{width:"30%",height:"100%"}} onSubmit={this.mySubmitHandler}>
        
          <Segment raised stacked inverted textAlign='center' style={{opacity:"0.55"}}>
          <Header as='h2' color='white' textAlign='center'>
        Vendor Login
        </Header>
          <Form.Input required icon='user' iconPosition='left' placeholder='Username' onChange={this.myChangeHandler} stackable/>
          <Form.Input required icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.myChangeHandler2}/>
          {this.renderRedirect()}
          <Button animated >
            <Button.Content visible>Login</Button.Content>
            <Button.Content hidden>
              <Icon name='sign in alternate'/>
            </Button.Content>
            </Button>
          </Segment>
        </Form>
        </Grid.Row>

        <Grid.Row>
        <Segment stacked inverted textAlign='center' style={{width:"30%",opacity:"0.55"}}>
        <Header as='h2' color='white' textAlign='center'> 
        Admin Login
        </Header>
        
          {/* OAuth2 via Google(API) */}
          <GoogleLogin
            clientId="512964282293-l8jstgcnlvj6g761gahmnbmro1nhlj8v.apps.googleusercontent.com"
            clientSecret="_6RU-J34o06HkJDA4CF6MHqQ"
            hostedDomain="nineleaps.com"
          

            render={renderProps => (
              
            <Button icon='google' color="white" size="large" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</Button>)}

                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
          />
          
          </Segment>
      
      </Grid.Row>
    </Grid>
  
  </div>
)
        }}
export default Login