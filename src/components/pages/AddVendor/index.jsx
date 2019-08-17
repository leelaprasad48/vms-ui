import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react'
import { Button, Divider, Form, Grid,Segment, Icon} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import URLs from '../../../config';


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

function check(input) {  
  if(input.validity.typeMismatch){  
      input.setCustomValidity("Dude '" + input.value + "' is not a valid email. Enter something nice!!");  
  }  
  else {  oninput="check(this)"
      input.setCustomValidity("");  
  }                 
}  

// function pan(input){
//   var panno=;
//   if(input.validity.typeMismatch){
//        input.setCustomValidity("enter a valid pan card");

//   } else {oninput="pan(this)"
//     input.setCustomValidity("");
// }
// }


class AddVendor extends Component{
  
  constructor(props) {
    super(props);
    this.state = {status:'1'}
    this.state = { vname: '' };
    this.state = { ventype: '' };
    this.state = { vservice: ''};
    this.state = { vaddress: '' };
    this.state = { vptype: ''};
    this.state = { pan: ''};
    this.state = { gst: ''};
    this.state = { cpname: ''};
    this.state = { vmail: '' };
    this.state = { vpass: ''};
    this.state = { vmob: ''};
    this.state = { cperiod: ''};
    this.state = { bname: ''};
    this.state = { accno: ''};
    this.state = { bankbranch: ''};
    this.state = { ifsc: ''};
    this.state  ={ file: ''};
    this.state  ={ filename:''};
       
   }
  
     getFiles(files){
       //console.log(files)
       this.setState({filename:files[0].name})
       this.setState({ file: files[0].base64 })
      // console.log(this.state.file);
  }
  

    mySubmitHandler = (event) => {
       event.preventDefault();
       axios.post(URLs.baseURL+'/vendor/save',this.state,{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then(()=> {
       alert('post successful')
            
    })
    .catch(()=> {
        alert("post failed")
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
    
     render(){   
        return(
            <div>
               <div>
                   
               <Grid.Column >
                 <Form   onSubmit={this.mySubmitHandler} >
                      <Form.Group >
                         <div>          
                             <Segment style={{width: "140%",marginLeft:"8%", marginTop:"5%",marginRight:"5%"}} >
                                  <Grid columns={3} relaxed='very' >
                                      <Grid.Column>
                                          <Divider horizontal>Basic Details</Divider>
                                              <Form.Input style={{width:"100%"}} required type='text' label='Name of the Organization' placeholder='Name of the Organization' onChange={this.myChangeHandler} content='initial-scale='/>
                                              <Form.Select style={{width:"100%"}} fluid label='Entity Type' clearable options={entitytype} selection placeholder='Entity Type' onChange={this.myChangeHandler1}/>
                                              <Form.Select style={{width:"100%"}} fluid label='Type of Service' clearable options={typeofservice} selection placeholder='Type of Service' onChange={this.myChangeHandler2}/>
                                              <Form.Input style={{width:"100%"}} required type='text' label='Address' placeholder='Address' onChange={this.myChangeHandler3}/>
                                              <Form.Select style={{width:"100%"}} fluid label='Partner Type' clearable options={partnertype} selection placeholder='Partner Type' onChange={this.myChangeHandler4} />
                                              <Form.Input style={{width:"100%"}} required type='text' pattern="[A-Z]{5}[0-9]{4}[A-Z]{2}" label='PAN No' placeholder='PAN No' onChange={this.myChangeHandler5} />
                                      </Grid.Column> 
                                      <Grid.Column>          
                                               <br></br>
                                              <br></br>
                                              <br></br>
                                              <Form.Input style={{width:"100%"}} required type='text' label='Contact Person Name' placeholder='Contact Person Name' onChange={this.myChangeHandler7}/>
                                              <Form.Input style={{width:"100%"}} required type='email' oninput="check(this)" label='Email' placeholder='Email' onChange={this.myChangeHandler8} />                        <Form.Input style={{width:"100%"}} required type='password'  label='Password' placeholder='Password' onChange={this.myChangeHandler9} />
                                              <Form.Input style={{width:"100%"}} required  type="text" pattern="[6789][0-9]{9}"  label='Mobile No' placeholder='Mobile No' onChange={this.myChangeHandler10} />
                                              <Form.Input style={{width:"100%"}} required type='text' label='Credit Period' placeholder='Credit Period' onChange={this.myChangeHandler11}/>
                                      </Grid.Column>
                                      <Grid.Column>
                                          <Divider horizontal style={{width:"100%"}}>Bank Details</Divider>
                                              <Form.Input style={{width:"100%"}} required type='text' label='Bank Name' placeholder='Bank Name' onChange={this.myChangeHandler12}/>
                                              <Form.Input  style={{width:"100%"}} required type='text' pattern="[0-9]{9,18}" label='Account Number' placeholder='Account Number'onChange={this.myChangeHandler13} />
                                              <Form.Input style={{width:"100%"}} required type='text' label='Branch' placeholder='Branch' onChange={this.myChangeHandler14}/>
                                              <Form.Input style={{width:"100%"}} required type='text' pattern='[A-Za-z]{4}[A-Z0-9]{5,13}' label='IFSC Code' placeholder='IFSC Code' onChange={this.myChangeHandler15} />
                                              <Form.Input  style={{width:"100%"}} required type='text' pattern='[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}' label='GSTIN' placeholder='GSTIN' onChange={this.myChangeHandler6}/>
                                              <p><b>Upload GSTIN</b></p>
                                              <FileBase64 required multiple={ true }
                                              style={{width:"100%"}}
                                              onDone={ this.getFiles.bind(this) } 
                                              />                                            
                                      </Grid.Column> 
                                     </Grid>
                              </Segment>
                                  <div style={{width: "140%"}} align="center">
                                  <Button animated color="grey">
                                    <Button.Content visible>Submit</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='angle double right' />
                                    </Button.Content>
                                  </Button>
                                  </div>
                              
                              {/* onClick={() => {
                        history.replace('/addvendor/')
                    }} */}      
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
