import React, {Component} from 'react';
import { Header,Checkbox, Button,Table, TableBody, Form , Icon, Modal, Segment, Grid, GridColumn, Divider} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import { Redirect,Link} from 'react-router-dom'
import URLs from '../../../config';

 class ActivateVendor extends Component {
    constructor(props){
        super(props);
        this.state={
            adminObject : undefined,
          }
        this.state = { vmail : '' };
        this.state = { vid : '' };
        this.state = { status : '' };
        
                
      }
      componentDidMount(){
        axios.get(URLs.baseURL+'/vendor/view/inactivevendors').then((adminData)=>{
       
        this.setState({adminObject: adminData.data})
        
        });
    }

    handleUpdateStatus =(event,rowid)=>{
        event.preventDefault();
        console.log(rowid);
       //PUT Request to Modify vendor status
        axios.put(URLs.baseURL+'/vendor/revokevendor/'+rowid).then(response => {
          
          //Success Case - And reloading the page with new data upon successful put. 
          if(response.status==200)
          {
            alert("The Vendor is now Active")
            window.location.reload();     
          }
          
        })          
        
      }


    render() {
        const { open, result } = this.state

        let {adminObject} = this.state;
        return (
            <div>
                <div>
         <Divider horizontal>Inactive Vendors</Divider>
             <Table celled fixed singleLine id="body" style={{marginLeft:"1%",marginTop:"5%",width:'100%'}}>
                <Table.Header>
                    <Table.Row>
                         <Table.HeaderCell textAlign="center" width={3}>Vendor Email</Table.HeaderCell>
                         <Table.HeaderCell textAlign="center" width={1}>Vendor ID</Table.HeaderCell>                        
                         <Table.HeaderCell textAlign="center" width={2}>Activate</Table.HeaderCell>
                     </Table.Row>
                </Table.Header>
             </Table>    
                 {/*  Actual Data */}
                 {adminObject && adminObject.map(obj =>{                    
                       return(                                 
                        <Table celled fixed singleLine style={{marginLeft:"1%",width:'100%'}}>
                          <TableBody>
                                <Table.Row >
                
                              <Table.Cell textAlign="center" width={3}>{obj.vmail}</Table.Cell> 
                              <Table.Cell textAlign="center" width={1}>{obj.vid}</Table.Cell>                                 
                              <Table.Cell textAlign="center" width={2}>

                                {/* Slider for toggling active status */}
                          <Modal trigger ={<Checkbox slider width={1}/>}basic size='small'>
                          <Header content='Activate this Vendor?' />
                          <Modal.Actions align='center'>
                                          <Button color='red' inverted onClick={this.NoHandler}>
                                          <Icon name='remove' /> No
                                          </Button>
                                          
                                          <Button color='green' inverted onClick={(e)=>this.handleUpdateStatus(e,obj.vid)}>
                                          
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
            </div>
        )
    }
}
export default ActivateVendor