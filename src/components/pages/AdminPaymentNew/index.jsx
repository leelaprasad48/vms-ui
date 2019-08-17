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
        this.state = { vmail : '' };
        this.state = { id : '' };
        this.state = { duedate : '' };
        this.state = { amount : '' };
        this.state = { open: false} ;
        this.state = {result: '0' }
                
      }
        componentDidMount(){
            axios.get(URLs.baseURL+'/invoice/pending',{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then((adminData)=>{
           
            this.setState({adminObject: adminData.data})
            console.log()
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
          console.log(rowid)
         
          axios.put(URLs.baseURL+'/invoice/updatepayment/'+rowid,{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}})
          .then(response => {
            console.log(response.status)
            if(response.status==200)
            {
              window.location.reload();     
            }
            else{
              alert("Upload Failed");
            }
          })          
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
              <div><Header as='h1' color="red" block>Pending Invoices</Header></div>
              <div>
            <Table celled fixed singleLine id="body" style={{marginLeft:"22%",marginTop:"5%",width:'50%'}}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" width={3}>Vendor email</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>Invoice Number</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>Due Date</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>Amount</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={1}>Pay</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            </Table>
            

            {adminObject && adminObject.map(obj =>{
              {console.log(obj)}
                return(
                  
                 
                    <Table celled fixed singleLine style={{marginLeft:"22%",width:'50%'}}>
                        <TableBody>
                             <Table.Row >
                
                              <Table.Cell textAlign="center" width={3}>{obj.email}</Table.Cell>        
                              <Table.Cell textAlign="center" width={2}>{obj.id}</Table.Cell>
                              <Table.Cell textAlign="center" width={2}>{obj.duedate}</Table.Cell>
                              <Table.Cell textAlign="left" width={2}>{obj.amount}</Table.Cell>
                              <Table.Cell textAlign="center" width={1}>
                          <Modal trigger ={<Checkbox slider width={1}/>}basic size='small'>
                          <Header content='Are you sure you want to Update the Payment Status?' />
                          <Modal.Actions align='center'>
                                          <Button color='red' inverted onClick={this.NoHandler}>
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