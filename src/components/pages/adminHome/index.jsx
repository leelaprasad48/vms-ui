import React, {Component} from 'react';
import { Button, Table , Modal,Header,Icon} from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.min.css';
import { Redirect,Link} from 'react-router-dom'
import axios from 'axios'
import URLs from '../../../config'


class AdminHome extends Component{


    constructor(props){
      super(props);
      this.state={
      adminObject: undefined,
      }
      this.state = { selectedRowId : '' };
    }
    
    state = {
      redirectToReferrer: false
    }

    state = {
      redirect: false
    }
   
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/adminhome' />
        
      }
      
    }

    handleRowClick =(event,rowname)=>{
      event.preventDefault();
      this.setState({selectedRowId : rowname});

      //let a=rowname;
      //alert("You are clicking row having row id "+a);

      
      
      //axios.post('https://logindetails.free.beeceptor.com',this.state)
    }

    handleEditClick=(event,rowid)=>{
      event.preventDefault();
      alert(rowid);

      this.props.history.push({
        pathname: '/UpdateVendor/',
        state : {Id : rowid}// your data array of objects
      })
      
    }

    handleDeleteClick =(event,rowid)=>{
      event.preventDefault();
      
      
     //alert(rowid)
     
      axios.put('https://75aea139.ngrok.io/vendor/deletee/'+rowid);
      
     
      this.setState({
        redirect: true
      })
    }

    
    componentDidMount(){
     
      
      axios.get('https://75aea139.ngrok.io/vendor/getBystatus').then((adminData)=>{
      //alert(adminData)
      this.setState({adminObject: adminData.data})

      })
    }
    
    
    render(){

      let {adminObject} = this.state;
       

        return(
          <div style={{margin:"5%"}}>
              <div align="right">
                <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out"></Button> 
              </div>
              <div> 
                <Button style={{backgroundColor:"blue",}}icon="add user" content="Add User"></Button>
              </div>
              <Table celled>
                <Table.Body>
                <Table.Row>
                
                  
                    <Table.Cell width={1}>Vendor Id</Table.Cell>
                    <Table.Cell width={2}>Name</Table.Cell>
                    <Table.Cell width={2}>Type</Table.Cell>
                    <Table.Cell width={2}>Office Served</Table.Cell>
                    <Table.Cell width={2}>Outstanding Amount</Table.Cell>
                    <Table.Cell width={3}>Action</Table.Cell>
                  
                </Table.Row>
                </Table.Body>
              </Table>


          {adminObject && adminObject.map(obj =>{
            return (                  
          <div>
            <div>

              
                

            <Table celled selectable>
              
        
              <Table.Body>
              <Table.Row onClick = {(e)=>this.handleRowClick(e,obj.vname)}>  
              <Table.Cell width={1}>{obj.vid}</Table.Cell>
              <Table.Cell width={2}>{obj.vname}</Table.Cell>
              <Table.Cell width={2}>{obj.vservice}</Table.Cell>
              <Table.Cell width={2}>A/B/C/D</Table.Cell>
              <Table.Cell width={2}>xxxxx</Table.Cell>
              <Table.Cell width={3}>
                <Button.Group>
                
        
              <Modal trigger={<Button icon="eye" content="View"></Button>} basic size='Large'>
                <Header content='Add Vendor Details' />
                <Modal.Content>
                  <Modal.Description>
      <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>{obj.vname}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Entity Type</Table.Cell>
                  <Table.Cell>{obj.ventype}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Type of Service</Table.Cell>
                  <Table.Cell>{obj.vservice}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Address</Table.Cell>
                  <Table.Cell>{obj.vaddress}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Partner Type</Table.Cell>
                  <Table.Cell>{obj.vptype}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>PAN No</Table.Cell>
                  <Table.Cell>{obj.pan}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>GSTIN</Table.Cell>
                  <Table.Cell>{obj.gst}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email-ID</Table.Cell>
                  <Table.Cell>{obj.vmail}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Mobile No</Table.Cell>
                  <Table.Cell>{obj.vmob}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
                    
        

      <Button icon="edit" content="Edit" onClick={(e)=>this.handleEditClick(e,obj.vid)}>
              

      </Button>
    
        
  <Modal trigger={<Button icon="user delete" content="Delete"></Button>} basic size='small'>
    <Header content='Do you really want to delete this vendor permanently' />
    <Modal.Actions align='center'>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      {this.renderRedirect()}
      <Button color='green' inverted onClick={(e)=>this.handleDeleteClick(e,obj.vid)}>
        
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
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

          <div>
          <Button style={{backgroundColor:"green",}}icon="payment" content="Payment"></Button>
          </div>

      </div> 
          
      )}
}
      


export default AdminHome;
