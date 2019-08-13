import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Divider, Form, Grid} from 'semantic-ui-react';
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import DatePicker from 'react-date-picker';

class Invupl extends Component{
    constructor(props) {
        super(props);
        this.state = { id : '' };
        this.state = { date : '' };
        this.state = { duedate : '' };
        this.state = { amount : '' };
        // /is.state = { invoicedoc : '' };
        this.state = { email : 'someone@something.com'};
        this.state  ={ invoicedoc : []} ;
       }


       getFiles(files){
        this.setState({ invoicedoc: files[0].base64 })
        console.log(this.state.invoicedoc);
      }


      mySubmitHandler = (event) => {
        event.preventDefault();
  
        axios.post('https://9fbf8394.ngrok.io/invoice/savee',this.state)
      }
  
      myChangeHandler = (event) => {
        this.setState({id: event.target.value});
      }
  
      myChangeHandler2 = (event) => {
          this.setState({date: event.target.value});
      }

      myChangeHandler3 = (event) => {
        this.setState({duedate: event.target.value});
    }

    myChangeHandler4 = (event) => {
        this.setState({amount: event.target.value});
    }

    // myChangeHandler5 = (event) => {
    //     this.setState({invoicedoc: event.target.value});
    // }

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
          return <Redirect to='/PrimaryLogin' />
        }
      }
  
    render(){
        return(
            <div>
                <div>
                    <div align="right">
                    {this.renderRedirect()}
                        <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out" onClick={this.setRedirect}></Button> 
                    </div>
                    <Divider horizontal>Invoice Upload</Divider>
                <div>
            </div>
            <Grid.Column>
                         <Form style={{ width: "50%"}} onSubmit={this.mySubmitHandler} >
                             <div style={{marginLeft:"54%",marginTop:"5%"}}>
                                 <Form.Input required label='Invoice Number' placeholder='Invoice Number' onChange={this.myChangeHandler} />
                                 <Form.Input required label='Date' placeholder='Date' onChange={this.myChangeHandler2} />
                                 <Form.Input required label='Due Date' placeholder='Due Date' onChange={this.myChangeHandler3}/>
                                 <Form.Input required label='Invoice Amount' placeholder='₹' onChange={this.myChangeHandler4}/>
                                 <p><b>Invoice Upload</b></p>
                                 <FileBase64 required
                                    multiple={ true }
                                    onDone={ this.getFiles.bind(this) } />

                                 <Button icon="checkmark" content='Submit' primary />
                             </div>
                         </Form>
                     </Grid.Column>
            </div>    
                       
          </div>
            );
    }
}


export default Invupl
