import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react'
import { Button, Divider, Form, Grid} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FileBase64 from 'react-file-base64';


let str = "1234567892";
str.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/gi)

const entitytype = [
  { key: 1, text: 'Public Limited', value: 'Public Limited' },
  { key: 2, text: 'Private Limited', value: 'Private Limited' },
]
const typeofservice = [
    { key: 1, text: 'Food', value: 'Food' },
    { key: 2, text: 'Electricity', value: 'Electricity' },
    { key: 3, text: 'Water', value: 'Water' },
    { key: 4, text: 'Wifi', value: 'Wifi' },
]
const partnertype = [
    { key: 1, text: 'Domestic Partner', value: 'Domestic Partner' },
    { key: 2, text: 'International Partner', value: 'International Partner' },
]

class AddVendor extends Component{


  constructor(props) {
    super(props);
    
    this.state = { vname: '' };
    this.state = { ventype: '' };
    this.state = { vservice: ''};
    this.state = { vaddress: '' };
    this.state = { vptype: ''};
    this.state = { pan: ''};
    this.state = { gst: ''};
    this.state = { cpname: ''};
    this.state = { vmail: ''};
    this.state = { vpass: ''};
    this.state = { vmob: ''};
    this.state = { cperiod: ''};
    this.state = { bname: ''};
    this.state = { accno: ''};
    this.state = { bankbranch: ''};
    this.state = { ifsc: ''};
    this.state  ={
      file:[]
  }
  this.state  ={
    filename:[]
}

   }
  

   getFiles(files){
     console.log(files)
    this.setState({filename:files[0].name})
    this.setState({ file: files[0].base64 })
    console.log(this.state.file);
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    

    axios.post('https://51b63bc5.ngrok.io/vendor/save',this.state).then(()=> {
      console.log('post successful')
    })
    
  }

  myChangeHandler = (event) => {
    this.setState({vname: event.target.value});
  }

  myChangeHandler1 = (event, data) => {
    this.setState({ventype: data.value});
    }
    myChangeHandler2 = (event, data) =>{
      this.setState({vservice: data.value});

    }
    myChangeHandler3 = (event) =>{
      this.setState({vaddress: event.target.value});

    }

    myChangeHandler4 = (event, data) =>{
      this.setState({vptype: data.value});

    }

    myChangeHandler5 = (event) =>{
      this.setState({pan: event.target.value});

    }

    myChangeHandler6 = (event) =>{
      this.setState({gst: event.target.value});

    }

    myChangeHandler7 = (event) =>{
      this.setState({cpname: event.target.value});

    }

    myChangeHandler8 = (event) =>{
      this.setState({vmail: event.target.value});

    }

    myChangeHandler9 = (event) =>{
      this.setState({vpass: event.target.value});
    }
    myChangeHandler10 = (event) =>{
      this.setState({vmob: event.target.value});

    }

    myChangeHandler11 = (event) =>{
      this.setState({cperiod: event.target.value});

    }

    myChangeHandler12 = (event) =>{
      this.setState({bname: event.target.value});

    }

    myChangeHandler13 = (event) => {
      this.setState({accno: event.target.value});

    }

    myChangeHandler14 = (event) =>{
      this.setState({bankbranch: event.target.value});

    }

    myChangeHandler15 = (event) =>{
      this.setState({ifsc: event.target.value});

    }
    


    state = {
        redirect: false
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if(this.state.redirect){
          return <Redirect to='/vendorlogin'/>
        }
      }



    render(){
      
        return(
            <div>
                <div>
                    <div align="right">
                        {this.renderRedirect()}

                        <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out" onClick={this.setRedirect}></Button> 
                        <Divider horizontal>Basic Details</Divider>
                    </div>
                  
                <div>
            </div>
            <Grid.Column>
                         <Form style={{ width: "50%"}} onSubmit={this.mySubmitHandler} >
                           <Form.Group widths='equal'>
                             <div style={{marginLeft:"54%",marginTop:"5%"}}>
                                
                                     
                                
                              
                                <Form.Input required label='Name of the Organization' placeholder='Name of the Organization' onChange={this.myChangeHandler} content='initial-scale='/>
                                <Form.Select fluid label='Entity Type' clearable options={entitytype} selection placeholder='Entity Type' onChange={this.myChangeHandler1}/>
                                
                                <Form.Select fluid label='Type of Service' clearable options={typeofservice} selection placeholder='Type of Service' onChange={this.myChangeHandler2}/>
                                <Form.Input required label='Address' placeholder='Address' onChange={this.myChangeHandler3}/>
                                <Form.Select fluid label='Partner Type' clearable options={partnertype} selection placeholder='Partner Type' onChange={this.myChangeHandler4} />
                                <Form.Input required type='^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$' label='PAN No' placeholder='PAN No' onChange={this.myChangeHandler5} />
                                <Form.Input required label='GSTIN' placeholder='GSTIN' onChange={this.myChangeHandler6}/>
                                <Form.Input required label='Contact Person Name' placeholder='Contact Person Name' onChange={this.myChangeHandler7}/>
                                <Form.Input type='email@' required label='Email' placeholder='Email' onChange={this.myChangeHandler8} />
                                <Form.Input type='password' required label='Password' placeholder='Password' onChange={this.myChangeHandler9} />
                                
                                <Form.Input required label='Mobile No' placeholder='Mobile No' onChange={this.myChangeHandler10} />
                                <Form.Input required label='Credit Period' placeholder='Credit Period' onChange={this.myChangeHandler11}/>
                                
                                
                                    <Divider horizontal>Bank Details</Divider>
                                

                                 <Form.Input required label='Bank Name' placeholder='Bank Name' onChange={this.myChangeHandler12}/>
                                 <Form.Input required label='Account Number' placeholder='Account Number'onChange={this.myChangeHandler13} />
                                 <Form.Input required label='Branch' placeholder='PAN No' onChange={this.myChangeHandler14}/>
                                 <Form.Input required label='IFSC Code' placeholder='GSTIN' onChange={this.myChangeHandler15} />
                                 
                                                             
                                    <Divider horizontal>Documents Upload</Divider>
                                 
                                    <FileBase64
                                    required multiple={ true }
      
                                   onDone={ this.getFiles.bind(this) } 
                                    />


    
                             <div align= "center">
                             <Button  content='Submit' primary/>
                             </div>
                             </div>
                             </Form.Group>
                         </Form>
                     </Grid.Column>
                    
          </div>               
          </div>
            );
    }
}


export default AddVendor