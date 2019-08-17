import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react'
import { Button, Divider, Form, Grid} from 'semantic-ui-react';
import { Segment, Tab } from 'semantic-ui-react'
//import 'filepond/dist/filepond.min.css';
//import { FilePond } from 'react-filepond';
import axios from 'axios';

let str = "1234567892";
str.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/gi)

const panes = [
   { menuItem: 'Basic Details', render: () =>  <Tab.Pane><Grid columns={2} relaxed='very' stackable size='massive'>
                    <Grid.Column>
                        <Form  style={{ width: "70%"}} onSubmit={() => this.mySubmitHandler()}  >
                            <div style={{marginLeft:"34%",marginTop:"5%"}}>
                                
                                <Form.Input required label='Name of the Organization' placeholder='Name of the Organization' onChange={() => {this.myChangeHandler()}} />
                                <Form.Select fluid label='Entity Type' clearable options={entitytype} selection placeholder='Entity Type' onChange={() => this.myChangeHandler1()}/>
                                <Form.Select fluid label='Type of Service' clearable options={typeofservice} selection placeholder='Type of Service' onChange={() => this.myChangeHandler2()}/>
                                <Form.Input required label='Address' placeholder='Address' onChange={() => this.myChangeHandler3()}/>
                                <Form.Select fluid label='Partner Type' clearable options={partnertype} selection placeholder='Partner Type' onChange={() => this.myChangeHandler4()} />
                                <Form.Input required type='^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$' label='PAN No' placeholder='PAN No' onChange={() => this.myChangeHandler5()} />
                                <Form.Input required label='GSTIN' placeholder='GSTIN' onChange={() => this.myChangeHandler6()}/>
                                <Form.Input required label='Contact Person Name' placeholder='Contact Person Name' onChange={() => this.myChangeHandler7()}/>
                                <Form.Input type='email@' required label='Email' placeholder='Email' onChange={() => this.myChangeHandler8()} />
                                <Form.Input type='password' required label='Password' placeholder='Password' onChange={() => this.myChangeHandler9()} />
                                
                                <Form.Input required label='Mobile No' placeholder='Mobile No' onChange={() => this.myChangeHandler10()} />
                                <Form.Input required label='Credit Period' placeholder='Credit Period' onChange={() => this.myChangeHandler11()}/>

                                <Button content='Next' primary />
                            </div>
                        </Form>
                    </Grid.Column></Grid>
                    </Tab.Pane>
                
                    
                     },
   { menuItem: 'Bank Details', render: () => <Tab.Pane><Grid columns={2} relaxed='very' stackable size='massive'>
                     <Grid.Column>
                         <Form style={{ width: "70%"}} onSubmit={() => this.mySubmitHandler()} >
                             <div style={{marginLeft:"34%",marginTop:"5%"}}>
                                 <Form.Input required label='Bank Name' placeholder='Bank Name' onChange={() => this.myChangeHandler12()}/>
                                 <Form.Input required label='Account Number' placeholder='Account Number'onChange={() => this.myChangeHandler13()} />
                                 <Form.Input required label='Branch' placeholder='PAN No' onChange={() => this.myChangeHandler14()}/>
                                 <Form.Input required label='IFSC Code' placeholder='GSTIN' onChange={() => this.myChangeHandler15()} />               
                                 <Button  type = "submit" content='Next' primary />
                             </div>
                         </Form>
                     </Grid.Column></Grid>
                     </Tab.Pane>
                     
                      },
   { menuItem: 'Documents Upload', render: () => <Tab.Pane><Form onSubmit={() => this.mySubmitHandler()}><input type= "file" name= "file" onChange={() => this.myChangeHandler16()}/></Form>
       <div align= "right">
       <Button style={{backgroundColor:"green"}} type="submit" content="Submit" ></Button></div>
   
   </Tab.Pane> 
}  
]



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


class BasicDetails extends Component{

    constructor(props) {
        super(props);

        //this.myChangeHandler = this.myChangeHandler.bind(this);
        this.state = { name_org: '' };
        this.state = { entitytype: '' };
        this.state = { typeofservice: ''};
        this.state = { address: '' };
        this.state = { partnertype: ''};
        this.state = { pan: ''};
        this.state = { GSTIN: ''};
        this.state = { name: ''};
        this.state = { email: ''};
        this.state = { password: ''};
        this.state = { mobile: ''};
        this.state = { credit: ''};
        this.state = { Bank_Name: ''};
        this.state = { Account_Number: ''};
    
        this.state = { Branch: ''};
        this.state = { IFSC_Code: ''};
        this.state = {file: ''};
        
    
      }
      

      mySubmitHandler = (event) => {
        event.preventDefault();
        //this.mySubmitHandler = this.mySubmitHandler.bind(this);
        axios.post('https://vendor.free.beeceptor.com',this.state)
      }
    
      myChangeHandler = event => {
        this.setState({ name_org: event.target.value});
      }
 
 
    
      myChangeHandler1 = event => {
        this.setState({entitytype: event.target.value});
        }
        myChangeHandler2 = event =>{
          this.setState({typeofservice: event.target.value});
    
        }
        myChangeHandler3 = event =>{
          this.setState({address: event.target.value});
    
        }
    
        myChangeHandler4 = event =>{
          this.setState({partnertype: event.target.value});
    
        }
    
        myChangeHandler5 = event =>{
          this.setState({pan: event.target.value});
    
        }
    
        myChangeHandler6 = event =>{
          this.setState({GSTIN: event.target.value});
    
        }
    
        myChangeHandler7 = event =>{
          this.setState({name: event.target.value});
    
        }
    
        myChangeHandler8 = event =>{
          this.setState({email: event.target.value});
    
        }
    
        myChangeHandler9 = event =>{
          this.setState({password: event.target.value});
        }
        myChangeHandler10 = event =>{
          this.setState({mobile: event.target.value});
    
        }
    
        myChangeHandler11 = event =>{
          this.setState({credit: event.target.value});
    
        }
    
        myChangeHandler12 = event =>{
          this.setState({Bank_Name: event.target.value});
    
        }
    
        myChangeHandler13 = event =>{
          this.setState({Account_Number: event.target.value});
    
        }
    
        myChangeHandler14 = event =>{
          this.setState({Branch: event.target.value});
    
        }
    
        myChangeHandler15 = event =>{
          this.setState({IFSC_Code: event.target.value});
    
        }
        myChangeHandler16 = event =>{
          this.setState({file: event.target.value});
    
        }
        
    render(){
        return(
            <div>
                <div>
                    <div align="right">
                        <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out"></Button> 
                    </div>
                    <Divider horizontal>ADD VENDOR</Divider>
                <div>
            </div>
            
            <Tab panes={panes} onTabChange={this.handleChange} />
            
          </div>               
          </div>
            );
    }
}


export default BasicDetails

//<FilePond allowMultiple={true} style={{backgroundColor:"red"}} onChange={this.myChangeHandler16}/>
        //<div style={{margin:'5%'}}></div>