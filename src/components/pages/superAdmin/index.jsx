import React, {Component} from 'react';
import { Header,Checkbox, Button,Table, TableBody, Form , Icon, Modal, Segment, Grid, GridColumn, Divider} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import { Redirect,Link} from 'react-router-dom'
import URLs from '../../../config';


class SuperAdmin extends Component {

    constructor(props){
        super(props);
        this.state={
            adminObject0 : undefined,
          }
        
          this.state = {
            adminObject1 : undefined,
          }

        this.state = { email : '' };
        this.state = { aid : '' };
        this.state = { status : '' };
        this.state = { open: false} ;
        this.setState({status :'1'});   
        
                
      }
      //getting unpaid  invoices from back-end.
        componentDidMount(){
            axios.get(URLs.baseURL+'/superadmin/viewzero',{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then((adminData0)=>{
           
            this.setState({adminObject0: adminData0.data})
            
            });
            

            
                axios.get(URLs.baseURL+'/superadmin/viewone',{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then((adminData1)=>{
               
                this.setState({adminObject1: adminData1.data})
                
                })
                }
            
    
        handleUpdateStatus1 =(event,rowid)=>{
          event.preventDefault();
          
         //PUT Request to Modify payment status
          axios.put(URLs.baseURL+'/superadmin/updatestatus0to1/'+rowid,{},{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}})
          .then(response => {
            
            //Success Case - And reloading te page with new data upon successful put. 
            if(response.status==200)
            {
              window.location.reload();     
            }
            //failure Case
            else{
              alert("Upload Failed");
            }
          })          
          this.setState({
            redirect: true
          })
        }



        handleUpdateStatus2 =(event,rowid)=>{
            event.preventDefault();
            
           //PUT Request to Modify payment status
            axios.put(URLs.baseURL+'/superadmin/updatestatus1to0/'+rowid,{},{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}})
            .then(response => {
              
              //Success Case - And reloading te page with new data upon successful put. 
              if(response.status==200)
              {
                window.location.reload();     
              }              
              //failure Case
              else{
                alert("Upload Failed");
              }
            })          
            this.setState({
              redirect: true
            })
          }
  

          myChangeHandler = (event) => {
            this.setState({email: event.target.value});
            this.setState({status:1});
          }

          AddAdmin = (event) => {
            
            event.preventDefault();
          
            console.log(this.state.status)
            axios.post(URLs.baseURL+'/superadmin/addmanual',this.state,{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}})
            .then(response => {
                console.log(response.status)
                //Success Case
                if(response.status==200)
                {
                    alert("Admin Added Successfully")
                   window.location.reload();   
                }
                //Duplicate entry case
              else if(response.status==500)
              {
                alert("The Email Already Exists");     
              }
                //Failure Case
                else{
                  alert("Addition Failed");
                }
              }) 
          }
            
        
        


        render(){
      
        const { open, result } = this.state

         let {adminObject0} = this.state;
         let {adminObject1} = this.state;

         
        return(
            // Table Headings
            <div>
                     <div><Header as='h1' color="black" textAlign="center" block>Welcome-Super Admin
                     <Header.Subheader>Manage your Admins.</Header.Subheader>
                     </Header></div>
                        <Segment>                        
                            <Grid columns={2} relaxed="very">
                                <Grid.Column>
                        <div align="left" >
                            <Divider horizontal>Pending Admin Requests</Divider>
                            <Table celled fixed singleLine id="body" style={{marginLeft:"1%",marginTop:"5%",width:'100%'}}>
                              <Table.Header>
                                 <Table.Row>
                                     <Table.HeaderCell textAlign="center" width={3}>Email</Table.HeaderCell>
                                     <Table.HeaderCell textAlign="center" width={1}>Admin ID</Table.HeaderCell>
                                     {/* <Table.HeaderCell textAlign="center" width={1}>Status</Table.HeaderCell> */}
                                     <Table.HeaderCell textAlign="center" width={2}>Request Approval</Table.HeaderCell>
                                 </Table.Row>
                             </Table.Header>
                            </Table>
            
         {/*  Actual Data */}
            {adminObject0 && adminObject0.map(obj =>{
              
                return(
                  
                 
                    <Table celled fixed singleLine style={{marginLeft:"1%",width:'100%'}}>
                        <TableBody>
                             <Table.Row >
                
                                 <Table.Cell textAlign="center" width={3}>{obj.email}</Table.Cell> 
                                 <Table.Cell textAlign="center" width={1}>{obj.aid}</Table.Cell>   
                                 {/* <Table.Cell textAlign="center" width={1}>{obj.status}</Table.Cell>       */}
                                 <Table.Cell textAlign="center" width={2}>

                                {/* Slider for toggling payment status */}
                          <Modal trigger ={<Checkbox slider width={1}/>}basic size='small'>
                          <Header content='Give Admin Access?' />
                          <Modal.Actions align='center'>
                                          <Button color='red' inverted onClick={this.NoHandler}>
                                          <Icon name='remove' /> No
                                          </Button>
                                          
                                          <Button color='green' inverted onClick={(e)=>this.handleUpdateStatus1(e,obj.aid)}>
                                          
                                          <Icon name='checkmark' /> Yes
                                      </Button>
                              </Modal.Actions>
                          </Modal>
                              </Table.Cell>
                            </Table.Row>
                            
                        </TableBody>
                   </Table>
                   
         )
        }
        )}

        
                         </div>
           </Grid.Column>
       
        
        <Grid.Column>
          
         <div>
         <Divider horizontal>Existing Admins</Divider>
             <Table celled fixed singleLine id="body" style={{marginLeft:"1%",marginTop:"5%",width:'100%'}}>
                <Table.Header>
                    <Table.Row>
                         <Table.HeaderCell textAlign="center" width={3}>Email</Table.HeaderCell>
                         <Table.HeaderCell textAlign="center" width={1}>Admin ID</Table.HeaderCell>
                         {/* <Table.HeaderCell textAlign="center" width={1}>Status</Table.HeaderCell> */}
                         <Table.HeaderCell textAlign="center" width={2}>Status Revocation</Table.HeaderCell>
                     </Table.Row>
                </Table.Header>
             </Table>    
                 {/*  Actual Data */}
                 {adminObject1 && adminObject1.map(obj =>{
                      
                       return(
                  
                 
                        <Table celled fixed singleLine style={{marginLeft:"1%",width:'100%'}}>
                          <TableBody>
                                <Table.Row >
                
                              <Table.Cell textAlign="center" width={3}>{obj.email}</Table.Cell> 
                              <Table.Cell textAlign="center" width={1}>{obj.aid}</Table.Cell>   
                              {/* <Table.Cell textAlign="center" width={1}>{obj.status}</Table.Cell>       */}
                              <Table.Cell textAlign="center" width={2}>

                                {/* Slider for toggling payment status */}
                          <Modal trigger ={<Checkbox slider width={1}/>}basic size='small'>
                          <Header content='Revoke Admin Access?' />
                          <Modal.Actions align='center'>
                                          <Button color='red' inverted onClick={this.NoHandler}>
                                          <Icon name='remove' /> No
                                          </Button>
                                          
                                          <Button color='green' inverted onClick={(e)=>this.handleUpdateStatus2(e,obj.aid)}>
                                          
                                          <Icon name='checkmark' /> Yes
                                      </Button>
                              </Modal.Actions>
                          </Modal>
                              </Table.Cell>
                            </Table.Row>
                            
                        </TableBody>
                   </Table>
                        
    )
    
    
}
)

}      
 </div>
</Grid.Column>

</Grid>


</Segment>

<div>
<Header as='h2' color='teal' textAlign='center'>
         Add Admin 
      </Header>
<Form style={{marginLeft:'37%',width:'25%'}} size='small'>
        <Segment stacked>
          <Form.Input type="email" fluid icon='user secret' iconPosition='left' placeholder='Admin E-mail address' onChange={this.myChangeHandler}/>         
         <Button animated color='teal' fluid size='large' onClick={this.AddAdmin}>
         <Button.Content visible> Add</Button.Content>
         <Button.Content hidden>
        <Icon name='plus square' />
      </Button.Content>
          </Button>
        </Segment>
      </Form>
</div>

     </div>
    
   ) }     
  }
        export default SuperAdmin