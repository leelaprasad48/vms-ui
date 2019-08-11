import React, {Component} from 'react';
import { Button, Divider, Header, Grid, Icon } from 'semantic-ui-react';
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
  this.responseGoogle=this.responseGoogle.bind(this);
}

  responseGoogle= (response) => {
    console.log(response.profileObj)
    var email=response.profileObj.email;
    var adminDetails = {};
    adminDetails['email'] =  email;
    axios.post('https://1e882d3c.ngrok.io/admin/email',adminDetails).then(response=>
    {   
        alert(JSON.stringify(response.data));
        this.setState({status : response.data[0].status })
        alert('State Alert:'+this.state.status);
        
        if(this.state.status==1)
                    {
                      this.props.history.push({
                          pathname: '/VendorHome',
                          state : {email : this.state.vmail}
                      }) 
                    }
          else
                    {
                     alert("Unauthorized for Admin Acces! Please request Super Admin.")
                    } 
               
  
    })
    alert(JSON.stringify(adminDetails));
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
                        <Image src='https://d1hbpr09pwz0sk.cloudfront.net/logo_url/nineleaps-technology-solutions-pvt-ltd-35904afd' size='massive' />
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
