import React, {Component} from 'react';
import { Button, Table , Modal,Header,Icon} from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.min.css';
import { Redirect,Link} from 'react-router-dom'
import axios from 'axios'
import URLs from '../../../config'
import Spinner from 'react-spinner-material';


class AdminHome extends Component{


 constructor(props){
 super(props);
 this.state={
 adminObject: undefined,
 }
 this.state = { selectedRowId : '' };
 }

 handleRowClick =(event,rowname,email)=>{
 event.preventDefault();
 this.setState({selectedRowId : rowname});
 axios.get(URLs.baseURL+'/vendor/outstanding/'+email,{ headers: {Authorization :localStorage.getItem("jwtTokenAdmin")}}).then((response)=>{
  console.log(response)
  this.setState({outstandingAmt : response.data});
  if(this.state.outstandingAmt==="")
  {
    this.setState({outstandingAmt: "No pending Amount"})
  }
  
  }).catch(err=>{
  localStorage.removeItem('jwtTokenAdmin')
  this.props.history.push('/')});
 }

 handleEditClick=(event,rowid)=>{
 event.preventDefault();
 this.props.history.push({
 pathname: '/admin/UpdateVendor/',
 state : {Id : rowid}// your data array of objects
 })
 
 }

 handleDeleteClick = async (event,index)=>{
   console.log('data', index);
 event.preventDefault();
 const { adminObject } = this.state;
 try {
   await axios.put(URLs.baseURL+'/vendor/softdelete/'+adminObject[index].vid,{},{ headers: {Authorization :localStorage.getItem("jwtTokenAdmin")}});
   adminObject.splice(index,1);
   this.setState({ adminObject })
  } catch (e) {
   console.log('error', e);
 };
 window.location.reload();

 }

 handleNoClick =(event)=>{
  event.preventDefault();
  window.location.reload();
 
  }

 
 componentDidMount(){
 
 
 axios.get(URLs.baseURL+'/vendor/view/activevendor',{ headers: {Authorization :localStorage.getItem("jwtTokenAdmin")}}).then((adminData)=>{
 console.log(adminData)
 this.setState({adminObject: adminData.data})
 
 }).catch(err=>{
 localStorage.removeItem('jwtTokenAdmin')
 this.props.history.push('/')});

 axios.get(URLs.baseURL+'/vendor/view/activevendor',{ headers: {Authorization :localStorage.getItem("jwtTokenAdmin")}}).then((adminData)=>{
  console.log(adminData)
  this.setState({adminObject: adminData.data})
  
  }).catch(err=>{
  localStorage.removeItem('jwtTokenAdmin')
  this.props.history.push('/')});

  



 }

 
 
 
 render(){

 let {adminObject} = this.state;
 
 if(this.state.adminObject=== undefined)
 {
   return(
       <div align="center" style={{marginTop:"15%"}}>
          <Spinner size={100} spinnerColor={"#333"} spinnerWidth={10} visible={true} />
       </div>
   )

 }
 return(

  
 <div style={{margin:"5%"}}>
 
 <Table style={{marginleft:"5%",marginTop:"5%",width:"89.5%"}}>
 <Table.Header>
 <Table.Row >
 
 
 <Table.HeaderCell textAlign='center' width={2}>Vendor Id</Table.HeaderCell>
 <Table.HeaderCell textAlign='center' width={3}>Name</Table.HeaderCell>
 <Table.HeaderCell textAlign='center' width={2}>Type of Service</Table.HeaderCell>
 <Table.HeaderCell textAlign='center' width={3}>E-mail Id</Table.HeaderCell>
 <Table.HeaderCell textAlign='center' width={3}>Mobile No</Table.HeaderCell>
 {/* <Table.HeaderCell textAlign='center' width={2}>Action</Table.HeaderCell> */}
 
 </Table.Row>
 </Table.Header>
 </Table>


 {adminObject && adminObject.map((obj,index) =>{
 return ( 
 <div>
 <div>

 
 

 <Table celled selectable style={{marginleft:"2%",marginTop:"0%",width:"103%",border:"none"}}>
 
 
 <Table.Body>
 <Table.Row onClick = {(e)=>this.handleRowClick(e,obj.vname,obj.vmail)}>

   
 <Table.Cell textAlign='center' width={2}>{obj.vid}</Table.Cell>
 <Table.Cell textAlign='center' width={3}>{obj.vname}</Table.Cell>
 <Table.Cell textAlign='center' width={2}>{obj.vservice}</Table.Cell>
 <Table.Cell textAlign='center' width={3}>{obj.vmail}</Table.Cell>
 <Table.Cell textAlign='center'width={3}>{obj.vmob}</Table.Cell>
 <Table.Cell style={{border:"hidden"}} textAlign='center'width={2}>
 <Button.Group align="left">
 
 
 <Modal trigger={<Button inverted secondary icon="eye" circular ></Button>} size='Large'>
 {/* <Header textAlign="center" content='Vendor Details' /> */}
 <Modal.Actions>
 <p style={{textAlign:"left",fontSize:"30px"}}><b>Vendor Details</b>
 <Modal trigger={<Button floated="right" icon="user delete" content="Delete"></Button>} size='small'>
 <Header content='Do you really want to delete this vendor permanently' />
 <Modal.Actions align='center'>
 <Button basic color='red' onClick={this.handleNoClick} inverted>
 <Icon name='remove' /> No
 </Button>
 
 <Button color='green' inverted onClick={async (e)=> await this.handleDeleteClick(e,index)}>
 
 <Icon name='checkmark' /> Yes
 </Button>
 
 </Modal.Actions>
 </Modal>
 <Button icon="edit" floated="right" content="Edit" onClick={(e)=>this.handleEditClick(e,obj.vid)}>
 </Button></p>
   
  </Modal.Actions>
 <Modal.Content>
   
 <Modal.Description>
 <Table>
 <Table.Body>
 <Table.Row>
 <Table.Cell><b>Name</b></Table.Cell>
 <Table.Cell >{obj.vname}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Entity Type</b></Table.Cell>
 <Table.Cell>{obj.ventype}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Type of Service</b></Table.Cell>
 <Table.Cell>{obj.vservice}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Address</b></Table.Cell>
 <Table.Cell>{obj.vaddress}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Partner Type</b></Table.Cell>
 <Table.Cell>{obj.vptype}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>PAN No</b></Table.Cell>
 <Table.Cell>{obj.pan}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Contact Person Name</b></Table.Cell>
 <Table.Cell>{obj.cpname}</Table.Cell>
 </Table.Row>
  <Table.Row>
 <Table.Cell><b>Email-ID</b></Table.Cell>
 <Table.Cell>{obj.vmail}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Mobile No</b></Table.Cell>
 <Table.Cell>{obj.vmob}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Credit Period</b></Table.Cell>
 <Table.Cell>{obj.cperiod}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Bank Name</b></Table.Cell>
 <Table.Cell>{obj.bname}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>Account Number</b></Table.Cell>
 <Table.Cell>{obj.accno}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>IFSC</b></Table.Cell>
 <Table.Cell>{obj.ifsc}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>GSTIN</b></Table.Cell>
 <Table.Cell>{obj.gst}</Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>GSTIN Document</b></Table.Cell>
 <Table.Cell><a target="_blank" rel="noreferrer noopener" data-qa="message_attachment-title_link" class="c-message_attachment_title_link" href={obj.file}>{obj.filename}<span dir="auto"></span></a></Table.Cell>
 </Table.Row>
 <Table.Row>
 <Table.Cell><b>OutStanding Amount</b></Table.Cell>
 <Table.Cell>{this.state.outstandingAmt}</Table.Cell>
 </Table.Row>
 </Table.Body>
 </Table>
 </Modal.Description>
 </Modal.Content>
 
 </Modal>
 </Button.Group>
 </Table.Cell>
 </Table.Row>
 </Table.Body>
 </Table>
 </div>
 </div>
 )
 }
 )}
 </div> 
 
 )}
}
 


export default AdminHome;