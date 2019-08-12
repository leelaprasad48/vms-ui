import React, {Component} from 'react';
import { Button, Divider, Header, Grid, Icon, Form, Segment } from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.min.css';
import {Image} from 'semantic-ui-react';
import GoogleLogin from 'react-google-login'
import axios from 'axios'


//Response sent by Google after successful login.
// const responseGoogle= (response) => {
//   console.log(response.profileObj)
//   var email=response.profileObj.email;
//   var adminDetails = {};
//   adminDetails['email'] =  email;
//   axios.post('https://1e882d3c.ngrok.io/admin/email',adminDetails).then(response=>
//   {   
//       alert(JSON.stringify(response.data));
//       //this.setState({status : response.data[0].status })
//       alert(response.data[0].status);
//       if(response.data[0].status==1)
//       {
        
//       }
//   })
//   alert(JSON.stringify(adminDetails));
//   console.log(adminDetails);
// }

class HomePage extends Component{
  constructor(props){
  super(props);
  this.state = { vmail : '' };
  this.state = { vpass : '' };
  this.responseGoogle=this.responseGoogle.bind(this);
}

mySubmitHandler = (event) => {
  event.preventDefault();
  axios.post('https://6ea3609e.ngrok.io/vendor/vmail',this.state).then(response=>
  {   
      //alert(response.data)
      this.setState({status : response.data })

         if(this.state.status==true)
              {
                this.props.history.push({
                    pathname: '/VendorHome',
                    state : {email : this.state.vmail}
                })
               
              }
         else
              {
               alert("Wrong Credentials")
              }        
  })
  
}

      myChangeHandler = (event) => {
      this.setState({vmail: event.target.value});
    }

      myChangeHandler2 = (event) => {
      this.setState({vpass: event.target.value});
}   


  responseGoogle= (response) => {
    console.log(response.profileObj)
    var email=response.profileObj.email;
    var adminDetails = {};
    adminDetails['email'] =  email;
    axios.post('https://db5b431d.ngrok.io/admin/email',adminDetails).then(response=>
    {   
        alert(JSON.stringify(response.data));
        
        this.setState({status : response.data[0].status })
        //alert('State Alert:'+this.state.status);

        //Checking admin status and redirecting appropriately.
        if(this.state.status==2){
          //alert("SuperAdmin")
        }
        else if(this.state.status==1)
                    {
                      this.props.history.push({
                          pathname: '/VendorHome',
                          state : {email : this.state.vmail}
                      }) 
                    }
          else if(this.state.status==0)
                    {
                     alert("You are yet to be authorized as Admin by Super Admin.")
                    } 
        
  
    })

    .catch(error => {
      console.log('ERROR', error)
      axios.post('https://db5b431d.ngrok.io/admin/saveadmin',adminDetails)
      alert("Your Request for Admin Access has been submitted to the SuperAdmin.!")
    })
    
    console.log(adminDetails);
  }
    render(){
        return(
          
          <div>
            <div>
              <Header as='h1' block> <Image src='https://assessment-system-dev.s3.amazonaws.com/static/img/nineleaps/nineleaps.png'></Image></Header>
            <div>
              <Header textAlign="center" color="teal" as='h3' block> Vendor Management System</Header>
            </div>
            <div>
               
              <Grid columns={2} relaxed='very' stackable size='massive'>
              
                  <Grid.Column >
                    <Form onSubmit={this.mySubmitHandler}>
                    <div>        
                <Header as='h4' color='teal' textAlign="center">
                <Icon name="sign in alternate"/>
                Vendor Login
                   </Header>
                       <Form.Input required icon='user' iconPosition='left' label='Username' placeholder='Username' onChange={this.myChangeHandler}/>
                       <Form.Input required icon='lock' iconPosition='left' label='Password' type='password' onChange={this.myChangeHandler2}/>
    
                        <Button content='Login' primary />
                        </div>
                      </Form>                      
                    </Grid.Column>
                   
                      <div><div>
                        <GoogleLogin
                        clientId="512964282293-l8jstgcnlvj6g761gahmnbmro1nhlj8v.apps.googleusercontent.com"
                        clientSecret="_6RU-J34o06HkJDA4CF6MHqQ"
                        hostedDomain="nineleaps.com"
                        render={renderProps => (
                        <Button  style={{marginTop:"100%",marginRight:"0%"}} icon='google' color="white" size="large" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</Button>
                          )}
                          buttonText="Login"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={'single_host_origin'}
                        />
                      </div>
                      </div>
            <Divider vertical hidden='true'/>
              </Grid>
            </div>
         </div>
         </div>
            );
    }
}
export default HomePage;
