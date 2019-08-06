import React, {Component} from 'react';
import { Button, Divider, Form, Grid,Container} from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.min.css';
import {Image} from 'semantic-ui-react';
import { BrowserRouter as Router, Route,Link, Redirect,withRouter} from 'react-router-dom';
import axios from 'axios';
import URLs from '../../../config'

    class VendorLogin extends Component{
    
        constructor(props) {
          super(props);
          this.state = { username : '' };
          this.state = { password : '' };
          
        }
        
    
        mySubmitHandler = (event) => {
          event.preventDefault();
    
          let user=this.state.username;
          let pass=this.state.password;
    
          alert("You are submitting " + user + " and " + pass);
          axios.post('https://logindetails.free.beeceptor.com',this.state)
        }
    
        myChangeHandler = (event) => {
          this.setState({username: event.target.value});
        }
    
        myChangeHandler2 = (event) => {
            this.setState({password: event.target.value});
        }
    
      
        render() {
          
    
          
          
            return(
              
              <div>
                <div> 
                  <Grid columns={2} relaxed='very' stackable size='massive'>
                        <Grid.Column >
                            <Image src='https://d1hbpr09pwz0sk.cloudfront.net/logo_url/nineleaps-technology-solutions-pvt-ltd-35904afd' size='massive' />
                        </Grid.Column>
        
                        <Grid.Column>
                          <Form style={{ width: "70%"}} onSubmit={this.mySubmitHandler}>
                            <div style={{marginLeft:"34%",marginTop:"35%"}}>
                              <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username'  onChange={this.myChangeHandler} />
                              <Form.Input icon='lock' iconPosition='left' label='Password' type='password' onChange={this.myChangeHandler2}/>
                              <Button type='submit' content='Login' primary />
    
    
                            </div>
                          </Form>
                        </Grid.Column>
                  </Grid>
                </div>
    
                <Divider vertical hidden='true'/>
    
                  <Container>
                    <p></p>
                  </Container>
         
              </div>  );
        }
    }
    export default VendorLogin;
    