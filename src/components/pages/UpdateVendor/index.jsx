import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react'
import { Button, Divider, Form, Grid} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import URLs from '../../../config'


const entitytype = [
  { key: 1, text: 'Public Limited', value: 1 },
  { key: 2, text: 'Private Limited', value: 2 },
]
const typeofservice = [
    { key: 1, text: 'Food', value: 1 },
    { key: 2, text: 'Electricity', value: 2 },
    { key: 3, text: 'Water', value: 3},
    { key: 4, text: 'Wifi', value: 4},
]
const partnertype = [
    { key: 1, text: 'Domestic Partner', value: 1 },
    { key: 2, text: 'International Partner', value: 2 },
]

    
    class UpdateVendor extends Component{
    
    
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
        
       }
    
       componentDidMount(){
           alert(this.props.location.state.Id)
        axios.get(URLs.baseURL+'/vendor/view/'+this.props.location.state.Id).then((adminData)=>{
        
        this.setState({vname : adminData.data.vname})
        this.setState({ventype : adminData.data.ventype})
        this.setState({vservice : adminData.data.vservice})
        this.setState({vaddress : adminData.data.vaddress})
        this.setState({vptype : adminData.data.vptype})
        this.setState({pan : adminData.data.pan})
        this.setState({gst : adminData.data.gst})
        this.setState({cpname : adminData.data.cpname})
        this.setState({vmail : adminData.data.vmail})
        this.setState({vpass : adminData.data.vpass})
        this.setState({vmob : adminData.data.vmob})
        this.setState({cperiod : adminData.data.cperiod})
        this.setState({bname : adminData.data.bname})
        this.setState({accno : adminData.data.accno})
        this.setState({bankbranch : adminData.data.bankbranch})
        this.setState({ifsc : adminData.data.ifsc})
        
        })
        }
      
      
    
    
      mySubmitHandler = (event) => {
        event.preventDefault();
        
      
    
        axios.put(URLs.baseURL+'/vendor/update/'+this.props.location.state.Id,this.state).then(()=> {
          console.log('post successful')
        })
        .catch(()=> {
          console.log("post failed")
        })
      }
    
      myChangeHandler = (event) => {
        this.setState({vname: event.target.value});
      }
    
      myChangeHandler1 = (event) => {
        this.setState({ventype: event.target.value});
        }
        myChangeHandler2 = (event) =>{
          this.setState({vservice: event.target.value});
    
        }
        myChangeHandler3 = (event) =>{
          this.setState({vaddress: event.target.value});
    
        }
    
        myChangeHandler4 = (event) =>{
          this.setState({vptype: event.target.value});
    
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
        
       // myChangeHandler16 = event =>{
         // this.setState({file: event.target.value});
    //<input type= "file" name= "file" onChange={this.myChangeHandler16}/>
    //    }
    
    
    
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

          var string = 'Hello World!';

// Encode the String
var encodedString = btoa(string);
console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

// Decode the String
var decodedString = atob(encodedString);
console.log(decodedString); // Outputs: "Hello World!"
    
            
            
    
            return(
    
    
                <div>
                    <div>
                    
                        <div align="right">
                            {this.renderRedirect()}
    
                            <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out" onClick={this.setRedirect}></Button> 
                        </div>
                        <div>
                        <Divider horizontal>Invoice Upload</Divider>
                        </div>
                    
                
    
                
    
                    
    
    
                <Grid.Column>
                             <Form  style={{ width: "50%"}} onSubmit={this.mySubmitHandler} >
                                 <div style={{marginLeft:"54%",marginTop:"5%"}}>
                                    
                                         <Divider horizontal>Basic Details</Divider>
                                    
    
                                    <Form.Input required label='Name of the Organization' placeholder='Name of the Organization' readOnly onChange={this.myChangeHandler} value={this.state.vname}/>
                                    <Form.Select fluid label='Entity Type' clearable options={entitytype} selection defaultValue='1' onChange={this.myChangeHandler1} />
                                    <Form.Select fluid label='Type of Service' clearable options={typeofservice} selection placeholder='Type of Service' onChange={this.myChangeHandler2} value={this.state.vservice}/>
                                    <Form.Input required label='Address' placeholder='Address' onChange={this.myChangeHandler3} value={this.state.vaddress}/>
                                    <Form.Select fluid label='Partner Type' clearable options={partnertype} selection placeholder='Partner Type' onChange={this.myChangeHandler4} value={this.state.vptype} />
                                    <Form.Input required label='PAN No' placeholder='PAN No' onChange={this.myChangeHandler5} value={this.state.pan}/>
                                    <Form.Input required label='GSTIN' placeholder='GSTIN' onChange={this.myChangeHandler6} value={this.state.gst}/>
                                    <Form.Input required label='Contact Person Name' placeholder='Contact Person Name' onChange={this.myChangeHandler7} value={this.state.cpname}/>
                                    <Form.Input type='email@' required label='Email' placeholder='Email' onChange={this.myChangeHandler8} value={this.state.vmail}/>
                                    <Form.Input type='password' required label='Password' placeholder='Password' onChange={this.myChangeHandler9} value={this.state.vpass}/>
                                    
                                    <Form.Input required label='Mobile No' placeholder='Mobile No' onChange={this.myChangeHandler10} value={this.state.vmob} />
                                    <Form.Input required label='Credit Period' placeholder='Credit Period' onChange={this.myChangeHandler11} value={this.state.cperiod}/>
                                    
                                    
                                        <Divider horizontal>Bank Details</Divider>
                                    
    
                                     <Form.Input required label='Bank Name' placeholder='Bank Name' onChange={this.myChangeHandler12} value={this.state.bname}/>
                                     <Form.Input required label='Account Number' placeholder='Account Number'onChange={this.myChangeHandler13} value={this.state.accno}/>
                                     <Form.Input required label='Branch' placeholder='PAN No' onChange={this.myChangeHandler14}value={this.state.bankbranch}/>
                                     <Form.Input required label='IFSC Code' placeholder='GSTIN' onChange={this.myChangeHandler15} value={this.state.ifsc}/>
                                                                 
                                        <Divider horizontal>Documents Upload</Divider>
                                     
                                     
                                             
    
        
                                 <div align= "center">
                                 <Button  content='Submit' primary/>
                                 </div>
                                 </div>
                             </Form>
                         </Grid.Column>
    
    
                        
              </div>               
              </div>
                );
        }
    }
    
    
    export default UpdateVendor
  
  


 