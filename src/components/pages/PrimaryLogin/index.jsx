import React, {Component} from 'react'
import { Button, Divider, Form, Grid, Segment, Header, Icon } from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class PrimaryLogin extends Component{
    constructor(props) {
        super(props);
        this.state = { vmail : '' };
        this.state = { vpass : '' };
        this.state = { aemail : '' };
        this.state = { status : '0' };
        this.state = { email : '' };
        
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

                 state = {
                redirect: false
                 }
         

      renderRedirect = () => {
        if (this.state.redirect)
         {
          return <Redirect to='/' />
         }
      }
      
  
      myChangeHandler = (event) => {
        this.setState({vmail: event.target.value});
      }
  
      myChangeHandler2 = (event) => {
          this.setState({vpass: event.target.value});
      }
      
      myChangeHandler3 = (event) =>{
      this.setState({aemail: event.target.value});
      }

      myChangeHandler4= (event) =>{
        this.setState({email: event.target.value});
        }


      mySubmitHandler2 = (event) =>{
          event.preventDefault();

            axios.get('https://7b9f15c7.ngrok.io/admin/email/'+this.state.aemail).then((adminData)=>{
            console.log(adminData.data);
            this.setState({status: adminData.data.status})
            //alert(adminData.data[0].status)
            if(adminData.data[0].status==1)
            {
                this.props.history.push({
                    pathname: '/',
                    state : {email : this.state.aemail}
               })
               
            }
            else{
                alert("Not Admin!")
            }
      }   )
      }  

      mySubmitHandler3 = (event) => {
        event.preventDefault();
        axios.post('https://6ea3609e.ngrok.io/admin/save',this.state)
      }

    render(){
        
        return(

             <Segment placeholder>
             <Grid columns={2} relaxed='very' stackable>
             <Grid.Column>
             <Form onSubmit={this.mySubmitHandler}>
        
                 <Header as='h4' color='teal' textAlign="center">
                    <Icon name="sign in alternate"/>
                    Vendor Login
                    </Header>
                 <Form.Input required icon='user' iconPosition='left' label='Username' placeholder='Username' onChange={this.myChangeHandler}/>
                <Form.Input required icon='lock' iconPosition='left' label='Password' type='password' onChange={this.myChangeHandler2}/>
             
                 <Button content='Login' primary />
            </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
          <Form onSubmit={this.mySubmitHandler2}>
             <Header as='h4' color='teal' textAlign="center">
             <Icon name="sign in alternate"/>
                 Admin Login
             </Header>
             <Form.Input required icon='user secret' iconPosition='left' label='Admin Email' placeholder='Admin email' onChange={this.myChangeHandler3}/>
             {this.renderRedirect()}
             <Button style={{backgroundColor:"lime"}} content='Verify' icon='check square' size='medium' />
         </Form>
         <Form onSubmit={this.mySubmitHandler3}>
             <div></div>
             
         <Header as='h4' color='teal' textAlign="center">
             <Icon name="angle double right"/>
                 Admin Request
             </Header>
         <Form.Input required icon='plus square' iconPosition='left' label='Email Address' placeholder='Enter email' onChange={this.myChangeHandler4}/>
         <Button style={{backgroundColor:"grey"}} content='Request' icon='hourglass' size='medium' />    
         </Form>
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
)
        }}
export default PrimaryLogin
