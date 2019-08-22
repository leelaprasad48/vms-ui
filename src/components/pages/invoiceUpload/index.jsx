import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Divider, Form, Grid, Segment,Icon} from 'semantic-ui-react';
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import URLs from '../../../config'


class InvoiceUpload extends Component{
    constructor(props) {
        super(props);
        this.state = { id : '' };
        this.state = { date : '' };
        this.state = { duedate : '' };
        this.state = { amount : '' };
        this.state = { email :''};
        this.state  ={ invoicedoc : ''} ;
        
       }


       getFiles(files){
        this.setState({ invoicedoc: files[0].base64 })
        console.log(this.state.invoicedoc);
        console.log("from file base"+files[0].base64)
      }

      mySubmitHandler = (event) => {
        event.preventDefault();
        
        axios.post(URLs.baseURL+'/invoice/savee',this.state,{ headers: {Authorization : ''+localStorage.getItem("jwtToken")}})
        .then(response => {
          console.log(response.status)
          if(response.status==200)
          {
          
            this.props.history.push({
              pathname: '/app/VendorHome',
          })
          }
          else{
              localStorage.removeItem('jwtToken');
              this.props.history.push('/');
          }
        })        
      }
      
  
      myChangeHandler = (event) => {
        this.setState({id: event.target.value});
        this.setState({email:''+localStorage.getItem("vmail")});
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
  
    render(){
        return(
            <div >
                <div>
                 
                    <Divider horizontal>Invoice Upload</Divider>
                <div>
            </div>
            <div >
            <Segment>
                         <Form style={{ width: "50%"}} onSubmit={this.mySubmitHandler} >
                             <div style={{marginLeft:"67%",marginTop:"5%",width:"60%"}}>
                                 <Form.Input required label='Invoice Number' placeholder='Invoice Number' onChange={this.myChangeHandler} />
                                 <Form.Input required type='date' label='Date' placeholder='Date' onChange={this.myChangeHandler2} />
                                 <Form.Input required type='date' label='Due Date' placeholder='Due Date' onChange={this.myChangeHandler3}/>
                                 <Form.Input required type='number' label='Invoice Amount' placeholder='₹' onChange={this.myChangeHandler4}/>
                                 <p><b>Invoice Upload</b></p>
                                 <FileBase64 required
                                    multiple={ true }
                                    onDone={ this.getFiles.bind(this) } />
                                  <div style={{marginTop:"3%",marginLeft:"37%"}}>
                                 
                                  <Button animated >
                                    <Button.Content visible>Submit</Button.Content>
                                    <Button.Content hidden>
                                    <Icon name='angle double right' />
            
                                    </Button.Content>
                                 </Button>
                                 </div>
                             </div>
                         </Form>
              </Segment>
              </div>
            </div>    
                       
          </div>
            );
    }
}


export default InvoiceUpload