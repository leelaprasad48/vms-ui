import React, {Component} from 'react';
import { Table, TableBody} from "semantic-ui-react";
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
            axios.get(URLs.baseURL+'/invoice/pendingzero').then((adminData)=>{
           
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
            <Table celled fixed singleLine id="body" style={{marginLeft:"0%",marginTop:"5%",width:'100%'}}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" width={3}>Vendor email</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={3}>Invoice Number</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>Due Date</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={1}>Amount</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={3}>Paid By</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            </Table>
            
         {/*  Actual Data */}
            {adminObject && adminObject.map(obj =>{
              {console.log(obj)}
                return(
                  
                 
                    <Table celled fixed singleLine style={{marginLeft:"22%",width:'50%'}}>
                        <TableBody>
                             <Table.Row >
                
                              <Table.Cell textAlign="center" width={3}>{obj.email}</Table.Cell>        
                              <Table.Cell textAlign="center" width={3}>{obj.id}</Table.Cell>
                              <Table.Cell textAlign="center" width={2}>{obj.duedate}</Table.Cell>
                              <Table.Cell textAlign="left" width={1}>{obj.amount}</Table.Cell>
                              <Table.Cell textAlign="left" width={3}>{obj.approvedby}</Table.Cell>
                             
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