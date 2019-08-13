import React, {Component} from 'react';
import { Header,Checkbox, Button,Table, TableBody,Confirm, Icon, Modal} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import { Redirect,Link} from 'react-router-dom'
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
            axios.get('https://9fbf8394.ngrok.io/invoice/view').then((adminData)=>{
           
            this.setState({adminObject: adminData.data})
            })
            }

        // mySliderHandler = (event,invoiceid)=>
        // {
         
        //   event.preventDefault();
        //   console.log(invoiceid)
        //   //this.myConfirmHadler.show();
        //   //this.myConfirmHadler();
          
          
        // }
        // myConfirmHadler = ()=>
        // {
        //   return(
        //     <Confirm open={this.state.open} onCancel={this.handleCancel} onConfirm={this.handleConfirm} />
        //   )
        // }

        // show = () => this.setState({ open: true })
        // handleConfirm = () => 
        // {
        // this.setState({ result: '1', open: false })
        // console.log(this.state.result);
        // }
        // handleCancel = () => this.setState({ result: '0', open: false })
        handleUpdateStatus =(event,rowid)=>{
          event.preventDefault();
         
          axios.put('https://9fbf8394.ngrok.io/updatepayment/'+rowid);
                 
          this.setState({
            redirect: true
          })
        }

        renderRedirect = () => {
          if (this.state.redirect) {
            return <Redirect to='/AdminPaymentNew' />
            
          }
          
        }
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
                          <Modal trigger ={<Checkbox slider />}basic size='small'>
                          <Header content='Are you sure you want to Update the Payment Status?' />
                          <Modal.Actions align='center'>
                                          <Button color='red' inverted>
                                          <Icon name='remove' /> No
                                          </Button>
                                          {this.renderRedirect()}
                                          <Button color='green' inverted onClick={(e)=>this.handleUpdateStatus(e,obj.id)}>
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
           
         </div>
       
        
      )  }     
}
        export default AdminPayment
