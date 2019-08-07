import React, {Component} from 'react';
import { Button, Divider, Header, Grid } from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.min.css';
import {Image} from 'semantic-ui-react';
import GoogleLogin from 'react-google-login'
import axios from 'axios'



const responseGoogle= (response) => {
  console.log(response.profileObj.email)
  var email=response.profileObj.email
  axios.post('https://emailtest.free.beeceptor.com',email)

}

class HomePage extends Component{
  
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
                        <Button style={{marginTop:"100%",marginRight:"0%"}} color="blue" size="massive" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</Button>
                          )}
                          buttonText="Login"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
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
