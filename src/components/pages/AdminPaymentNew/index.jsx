import React, {Component} from 'react';
import { Header,Checkbox, Button,Table, TableBody} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import URLs from '../../../config'

class AdminPayment extends Component{
    constructor(props){
        super(props);
        this.state={
        adminObject: undefined,
        }
        this.state = { selectedRowId : '' };
      }
        componentDidMount(){
            axios.get(URLs.baseURL + URLs.Invoices.url).then((adminData)=>{
            this.setState({adminObject: adminData.data})
            })
            }

    render(){

         let {adminObject} = this.state;

        return(
            <div>
            <div>
              <div><Header as='h1' color="red" block>Pending Invoices</Header></div>
            <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Vendor Name</Table.HeaderCell>
                <Table.HeaderCell>Invoice Number</Table.HeaderCell>
                <Table.HeaderCell>Due Date</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Pay</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            </Table>


            {adminObject && adminObject.map(obj =>{
                return(
                    <Table striped>
                        <TableBody>
                            <Table.Row>
                
                              <Table.Cell>{obj.vendorname}</Table.Cell>        
                              <Table.Cell>{obj.invoicenum}</Table.Cell>
                              <Table.Cell>{obj.duedate}</Table.Cell>
                              <Table.Cell>{obj.amount}</Table.Cell>
                              <Table.Cell>
                                <Checkbox slider />
                              </Table.Cell>
                            </Table.Row>
                        </TableBody>
                   </Table>
         )
        }
        )}
            
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>8 Invoices</Table.HeaderCell>
                <Table.HeaderCell>3 Paid</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </div>
           <div>
           <Button positive>Update to Paid</Button>
         </div>
         </div>
       
        
      )  }     
}
        export default AdminPayment
