import React, {Component} from 'react';
import { Header,Checkbox, Button,Table, TableBody,Confirm, Icon, Modal,Divider,Embed} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import { Redirect,Link} from 'react-router-dom'
import URLs from '../../../config'
import Spinner from 'react-spinner-material';


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
        this.state = {amail:''}

       
                
      }
        componentDidMount(){
            axios.get(URLs.baseURL+'/invoice/pendingone',{ headers: {Authorization :''+localStorage.getItem("jwtTokenAdmin")}}).then((adminData)=>{
           
            this.setState({adminObject: adminData.data})
            console.log(this.state.adminObject)
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
          const data={
            amail:localStorage.getItem("amail"),
            invoiceId:rowid
          }
         
          console.log(localStorage.getItem("amail"))

          axios.put(URLs.baseURL+'/invoice/approval/'+rowid+'/'+localStorage.getItem("amail"),{},{ headers: {Authorization :localStorage.getItem("jwtTokenAdmin")}})
          .then(response => {
            console.log(response.status)
            if(response.status==200)
            {
              window.location.reload();     
            }
            else{
              alert("Update Failed");
            }
          })          
         
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
            
            <div>
              <Divider horizontal><h1>Pending Invoices</h1></Divider>
              <div>
            <Table celled fixed singleLine id="body" style={{marginLeft:"15%",marginTop:"5%",width:'70%'}}>
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
              
                return(
                  
                 
                    <Table celled fixed  style={{marginLeft:"15%",width:'77%',border:"none"}}>
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
                                          
                                          <Button color='green' inverted onClick={(e)=>this.handleUpdateStatus(e,obj.id)}>
                                          <Icon name='checkmark' /> Yes
                                      </Button>
                              </Modal.Actions>
                          </Modal>
                              </Table.Cell>

            
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
        export default AdminPayment
