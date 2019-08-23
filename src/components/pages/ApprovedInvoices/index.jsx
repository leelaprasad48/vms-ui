import React, {Component} from 'react';
import { Table,Modal,Button,Embed,TableBody} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import URLs from '../../../config'


//Class and State Declarations
class PaidInvoices extends Component{
    constructor(props){
        super(props);
        this.state={
        adminObject: undefined,
        }
        this.state = { vmail : '' };
        this.state = { id : '' };
        this.state = { duedate : '' };
        this.state = { amount : '' };
        //this.state = { open: false} ;
        this.state = {approvedby : '' };
                
      }
      //getting Paid  invoices from back-end.
        componentDidMount(){
            axios.get(URLs.baseURL+'/invoice/pendingone',{ headers: {Authorization :localStorage.getItem("jwtTokenAdmin")}}).then((adminData)=>{
           
            this.setState({adminObject: adminData.data})
            console.log()
            })
            }

              
        //UI Part
    render(){
      
        

         let {adminObject} = this.state;

        return(
            // Table Headings
            <div>
              <div>
            <Table celled fixed singleLine id="body" style={{border:"none",marginLeft:"1%",marginTop:"5%",marginRight:"1%",width:'83%'}}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" width={3}>Vendor email</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={3}>Invoice Number</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>Due Date</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={1}>Amount</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={3}>Approved By</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            </Table>
            
         {/*  Actual Data */}
            {adminObject && adminObject.map(obj =>{
              {console.log(obj)}
                return(
                  
                 
                    <Table celled fixed singleLine style={{border:"none",marginLeft:"1%",marginRight:"1%",width:'90%'}}>
                        <TableBody>
                             <Table.Row >
                
                              <Table.Cell textAlign="center" width={3}>{obj.email}</Table.Cell>        
                              <Table.Cell textAlign="center" width={3}>{obj.id}</Table.Cell>
                              <Table.Cell textAlign="center" width={2}>{obj.duedate}</Table.Cell>
                              <Table.Cell textAlign="left" width={1}>{obj.amount}</Table.Cell>
                              <Table.Cell textAlign="left" width={3}>{obj.approvedby}</Table.Cell>
                              <Table.Cell style={{border:"hidden"}} textAlign="center" width={1}>
                                <Modal trigger={<Button inverted secondary icon="eye" circular></Button> }size='large'>
                                <Modal.Header>Select a Photo</Modal.Header>
                                  <Modal.Content>
                                    <Embed active={true}
                                      icon='right circle arrow'
                                      placeholder='/images/image-16by9.png'
                                      url={obj.invoicedoc}
                                    />
      
                                  </Modal.Content>  
                                </Modal></Table.Cell>
                             
                            </Table.Row>
                            
                        </TableBody>
                   </Table>
                   
         )
        }
        )}
            
           
          </div>
           
         </div>
       
        
      )  }     
}
        export default PaidInvoices