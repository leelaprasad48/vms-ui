import React, {Component} from 'react';
import { Header,Checkbox, Button,Table, TableBody,Confirm} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import URLs from '../../../config'

class AdminPayment extends Component{
    constructor(props){
        super(props);
        this.state={
        adminObject: undefined,
        }
        this.state = { email : '' };
        this.state = { id : '' };
        this.state = { duedate : '' };
        this.state = { amount : '' };
        this.state = { open: false} ;
        this.state = {result: '0' }
        
        
      }
        componentDidMount(){
            axios.get('https://4aaa8b4a.ngrok.io/invoice/view').then((adminData)=>{
           
            this.setState({adminObject: adminData.data})
            })
            }

        mySliderHandler = (event,invoiceid)=>
        {
         
          event.preventDefault();
          console.log(invoiceid)
          //this.myConfirmHadler.show();
          //this.myConfirmHadler();
          
          
        }
        myConfirmHadler = ()=>
        {
          return(
            <Confirm open={this.state.open} onCancel={this.handleCancel} onConfirm={this.handleConfirm} />
          )
        }

        show = () => this.setState({ open: true })
        handleConfirm = () => 
        {
        this.setState({ result: '1', open: false })
        console.log(this.state.result);
        }
        handleCancel = () => this.setState({ result: '0', open: false })
        
        


    render(){

        const { open, result } = this.state

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
                
                              <Table.Cell>{obj.email}</Table.Cell>        
                              <Table.Cell>{obj.id}</Table.Cell>
                              <Table.Cell>{obj.duedate}</Table.Cell>
                              <Table.Cell>{obj.amount}</Table.Cell>
                              <Table.Cell>
                                <Checkbox slider onChange={(e)=>this.mySliderHandler(e,obj.id)}/>
                              </Table.Cell>
                            </Table.Row>
                        </TableBody>
                   </Table>
         )
        }
        )}
            
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>n Unpaid Invoices</Table.HeaderCell>
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
