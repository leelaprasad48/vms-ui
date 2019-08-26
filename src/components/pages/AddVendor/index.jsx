import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react'
import { Button, Divider, Form, Grid,Segment, Icon} from 'semantic-ui-react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import URLs from '../../../config';
import  {entitytype,typeofservice,partnertype} from '../../../constants';

// const entitytype = [
//   { key: 1, text: 'Public Limited', value: 'Public Limited' },
//   { key: 2, text: 'Private Limited', value: 'Private Limited' },
// ]
// const typeofservice = [
//     { key: 1, text: 'Food', value: 'Food' },
//     { key: 2, text: 'Electricity', value: 'Electricity' },
//     { key: 3, text: 'Water', value: 'Water' },
//     { key: 4, text: 'Wifi', value: 'Wifi' },
// ]
// const partnertype = [
//     { key: 1, text: 'Domestic Partner', value: 'Domestic Partner' },
//     { key: 2, text: 'International Partner', value: 'International Partner' },
// ]

class AddVendor extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        status:'1',
        vname: '' ,
        ventype: '',
        vservice: '',
        vaddress: '',
        vptype: '',
        pan: '',
        gst: '',
        cpname: '',
        vmail: '',
        vpass: '',
        vmob: '',
        cperiod: '',
        bname: '',
        accno: '',
        bankbranch: '',
        ifsc: '',
        file: '',
        filename:'',
        
    } 
   }
  
     getFiles(files){
       this.setState({filename:files[0].name})
       this.setState({ file: files[0].base64 })
     }
    mySubmitHandler = (event) => {
       event.preventDefault();
       if(this.state.filename!=null){
       axios.post(URLs.baseURL+'/vendor/save',this.state,{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then((response)=> {
       console.log(response);
        if(response.status==200){
        alert("post successful")
        this.setState(prevState => ({ visible: !prevState.visible }))
    
        this.props.history.push({
          pathname:'/admin/AdminHome'
        })
       }
       else{
         localStorage.removeItem("jwtTokenAdmin");
         this.props.history.push({
          pathname:'/'
        })
      }      
            
    })
    .catch(()=> {
        alert("post failed")
    })
  }
  else{
    alert("GSTIN File is required")
  }
   }

    myChangeHandler = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }
    toggleVisibility = () => this.setState(prevState => ({ visible: !prevState.visible }))
    
     render(){   
        return(
            <div>
               <div>
               
                    <Divider horizontal><h1>Add Vendor</h1></Divider> 
               <Grid.Column >
                 <Form  success onSubmit={this.mySubmitHandler} >
                      <Form.Group >
                         <div>          
                             <Segment style={{width: "140%",marginLeft:"8%", marginTop:"3%",marginRight:"5%"}} >
                                  <Grid columns={3} relaxed='very' >
                                      <Grid.Column>
                                          <Divider horizontal style={{width:"100%"}}>Basic Details</Divider>
                                              <Form.Input style={{width:"100%"}} required type='text' name='vname' label='Name of the Organization' placeholder='Name of the Organization' onChange={this.myChangeHandler} content='initial-scale='/>
                                              <Form.Select style={{width:"100%"}} fluid name='ventype' label='Entity Type' clearable options={entitytype} selection placeholder='Entity Type' onChange={this.myChangeHandler}/>
                                              <Form.Select style={{width:"100%"}} fluid name='vservice' label='Type of Service' clearable options={typeofservice} selection placeholder='Type of Service' onChange={this.myChangeHandler}/>
                                              <Form.Input style={{width:"100%"}} required name='vaddress' type='text' label='Address' placeholder='Address' onChange={this.myChangeHandler}/>
                                              <Form.Select style={{width:"100%"}} fluid name='vptype' label='Partner Type' clearable options={partnertype} selection placeholder='Partner Type' onChange={this.myChangeHandler} />
                                              <Form.Input style={{width:"100%"}} required name='pan' type='text' pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" label='PAN No' placeholder='PAN No' onChange={this.myChangeHandler} />
                                      </Grid.Column> 
                                      <Grid.Column>          
                                              
                                              <br></br>
                                              <br></br>
                                              <br></br>
                                              <Form.Input style={{width:"100%"}} required name='cpname' type='text' label='Contact Person Name' placeholder='Contact Person Name' onChange={this.myChangeHandler}/>
                                              <Form.Input style={{width:"100%"}} required name='vmail' type='email' oninput="check(this)" label='Email' placeholder='Email' onChange={this.myChangeHandler} />                        <Form.Input style={{width:"100%"}} required type='password'  label='Password' placeholder='Password' onChange={this.myChangeHandler9} />
                                              <Form.Input style={{width:"100%"}} required name='vmob' type="text" pattern="[6789][0-9]{9}"  label='Mobile No' placeholder='Mobile No' onChange={this.myChangeHandler} />
                                            
                                              <Form.Input style={{width:"100%"}} required name='cperiod' type='text' label='Credit Period (In Days)'  placeholder='Credit Period' onChange={this.myChangeHandler}/>
                                      </Grid.Column>
                                      <Grid.Column>
                                          <Divider horizontal style={{width:"100%"}}>Bank Details</Divider>
                                              <Form.Input style={{width:"100%"}} required name='bname' type='text' label='Bank Name' placeholder='Bank Name' onChange={this.myChangeHandler}/>
                                              <Form.Input  style={{width:"100%"}} required name='accno' type='text' pattern="[0-9]{9,18}" label='Account Number' placeholder='Account Number'onChange={this.myChangeHandler} />
                                              <Form.Input style={{width:"100%"}} required name='bankbranch' type='text' label='Branch' placeholder='Branch' onChange={this.myChangeHandler}/>
                                              <Form.Input style={{width:"100%"}} required name='ifsc' type='text' pattern='[A-Za-z]{4}[A-Z0-9]{5,13}' label='IFSC Code' placeholder='IFSC Code' onChange={this.myChangeHandler} />
                                              <Form.Input  style={{width:"100%"}} required name='gst' type='text' pattern='[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}' label='GSTIN' placeholder='GSTIN' onChange={this.myChangeHandler}/>
                                              <p><b>Upload GSTIN</b></p>

                                              <FileBase64 type="file" required multiple={ true }
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