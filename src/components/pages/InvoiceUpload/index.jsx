import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react'
import { Button, Divider, Form, Grid} from 'semantic-ui-react';
import axios from 'axios'

class InvoiceUpload extends Component{

    state = {
        redirect: false
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <redirect to='/VendorLogin' />
        }
      }
    
    render(){
        return(
            <div>
                <div>
                    <div align="right">
                    {this.renderRedirect()}
                        <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out"></Button> 
                    </div>
                    <Divider horizontal>Invoice Upload</Divider>
                <div>
            </div>
            <Grid.Column>
                         <Form style={{ width: "50%"}} >
                             <div style={{marginLeft:"54%",marginTop:"5%"}}>
                                 <Form.Input required label='Invoice Number' placeholder='Invoice Number' />
                                 <Form.Input required label='Date' placeholder='Date' />
                                 <Form.Input required label='Due Date' placeholder='Due Date' />
                                 <Form.Input required label='Invoice Amount' placeholder='₹' />
                                 <Form.Input required label='Upload Invoice' placeholder='Upload Invoice' />
                                 <Button content='Submit' primary />
                             </div>
                         </Form>
                     </Grid.Column>
            </div>               
          </div>
            );
    }
}


export default InvoiceUpload
