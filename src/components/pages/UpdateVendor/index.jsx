import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment,Icon} from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import URLs from '../../../config';
import Spinner from 'react-spinner-material';


const entitytype = [
  { key: 1, text: 'Public Limited', value: 'Public Limited' },
  { key: 2, text: 'Private Limited', value: 'Private Limited' },
  
]
const typeofservice = [
    { key: 1, text: 'Food', value: 'Food' },
    { key: 2, text: 'Electricity', value: 'Electricity' },
    { key: 3, text: 'Water', value: 'Water'},
    { key: 4, text: 'Wifi', value: 'Wifi'},
]
const partnertype = [
    { key: 1, text: 'Domestic Partner', value: 'Domestic Partner' },
    { key: 2, text: 'International Partner', value: 'International Partner' },
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
    this.state  ={ file: ''};
    this.state  ={ filename:''};
    this.state  ={ adminObject: undefined};
    
   }


   getFiles(files){
    
    this.setState({filename:files[0].name})
    this.setState({ file: files[0].base64 })
   
}

   componentDidMount(){
       
    axios.get(URLs.baseURL+'/vendor/view/'+this.props.location.state.Id, { headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then((adminData)=>{
      this.setState({adminObject: adminData.data})
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
    
  

    axios.put(URLs.baseURL+'/vendor/update/'+this.props.location.state.Id,this.state,{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then((response)=> {
      
      if(response.status==200){
        alert('post successful')
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
      console.log("post failed")
    })
  }

  myChangeHandler = (event) => {
    this.setState({vname: event.target.value});
  }

  myChangeHandler1 = (event,data) => {
    this.setState({ventype: data.value});
    }
    myChangeHandler2 = (event,data) =>{
      this.setState({vservice: data.value});

    }
    myChangeHandler3 = (event) =>{
      this.setState({vaddress: event.target.value});

    }

    myChangeHandler4 = (event,data) =>{
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
        let {adminObject} = this.state;
 
        if(adminObject=== undefined)
        {
          return(
              <div align="center" style={{marginTop:"15%"}}>
                 <Spinner size={100} spinnerColor={"#333"} spinnerWidth={10} visible={true} />
              </div>
          )
       
        }

        return(


            <div>
                <div>
                
                    
                    <div>
                    <Divider horizontal><h1>Update Vendor</h1></Divider>
                    </div>

            <Grid.Column>
                         <Form onSubmit={this.mySubmitHandler} >
                         <Form.Group >
                         <div>          
                             <Segment inverted style={{width: "140%",marginLeft:"8%", marginTop:"2%",marginRight:"5%",opacity:"0.7"}} >
                                  <Grid columns={3} relaxed='very' >
                                      <Grid.Column>
                                          <Divider horizontal style={{width:"220%",color:"white"}}>Basic Details</Divider>
                               

                                <Form.Input style={{width:"100%"}} required type='text' label='Name of the Organization' placeholder='Name of the Organization' readOnly onChange={this.myChangeHandler} value={this.state.vname}/>
                                <Form.Select style={{width:"100%"}} fluid label='Entity Type' clearable options={entitytype} selection placeholder='Entity Type' onChange={this.myChangeHandler1} value={this.state.ventype}/>
                                <Form.Select style={{width:"100%"}} fluid label='Type of Service' clearable options={typeofservice} selection placeholder='Type of Service' onChange={this.myChangeHandler2} value={this.state.vservice}/>
                                <Form.Input  style={{width:"100%"}} required type="text" label='Address' placeholder='Address' onChange={this.myChangeHandler3} value={this.state.vaddress}/>
                                <Form.Select style={{width:"100%"}} fluid label='Partner Type' clearable options={partnertype} selection placeholder='Partner Type' onChange={this.myChangeHandler4} value={this.state.vptype} />
                                <Form.Input style={{width:"100%"}} required type='text' pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" label='PAN No' placeholder='PAN No' onChange={this.myChangeHandler5} value={this.state.pan}/>
                                </Grid.Column> 
                                      <Grid.Column>          
                                               <br></br>
                                              <br></br>
                                              <br></br>
                                
                                <Form.Input style={{width:"100%"}} required type='text' label='Contact Person Name' placeholder='Contact Person Name' onChange={this.myChangeHandler7} value={this.state.cpname}/>
                                <Form.Input style={{width:"100%"}} required type='email' label='Email' placeholder='Email' onChange={this.myChangeHandler8} value={this.state.vmail}/>
                                <Form.Input style={{width:"100%"}} required type='password' label='Password' placeholder='Password' onChange={this.myChangeHandler9} value={this.state.vpass}/>
                                
                                <Form.Input style={{width:"100%"}} required  type="text" pattern="[6789][0-9]{9}" label='Mobile No' placeholder='Mobile No' onChange={this.myChangeHandler10} value={this.state.vmob} />
                                <Form.Input style={{width:"100%"}} required type="text" label='Credit Period' placeholder='Credit Period' onChange={this.myChangeHandler11} value={this.state.cperiod}/>
                                
                                </Grid.Column>
                                      <Grid.Column>
                                          <Divider horizontal style={{width:"100%",color:"white"}}>Bank Details</Divider>
                                                               

                                 <Form.Input style={{width:"100%"}} required type="text" label='Bank Name' placeholder='Bank Name' onChange={this.myChangeHandler12} value={this.state.bname}/>
                                 <Form.Input style={{width:"100%"}} required type='text' pattern="[0-9]{9,18}" label='Account Number' placeholder='Account Number'onChange={this.myChangeHandler13} value={this.state.accno}/>
                                 <Form.Input style={{width:"100%"}} required  type="text" label='Branch' placeholder='Branch' onChange={this.myChangeHandler14}value={this.state.bankbranch}/>
                                 <Form.Input style={{width:"100%"}} required type='text' pattern='[A-Za-z]{4}[A-Z0-9]{5,13}' label='IFSC Code' placeholder='IFSC Code' onChange={this.myChangeHandler15} value={this.state.ifsc}/>
                                 <Form.Input style={{width:"100%"}} required type='text' pattern='[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}' label='GSTIN' placeholder='GSTIN' onChange={this.myChangeHandler6} value={this.state.gst}/>                          
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
                                                               
                                 
                                         
                                  </div>
                            </Form.Group>
    
                             
                             
                         </Form>
                     </Grid.Column>


                    
          </div>               
          </div>
            );
    }
}


export default UpdateVendor