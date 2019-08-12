import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import {Button, Divider, Header, Icon, Table ,Grid,Segment, GridColumn} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import URLs from '../../../config'


class VendorHome extends Component
{
    constructor(props){
        super(props);
        this.state={
            adminObject: undefined,
          }
        
        this.state = {
            vendorObject: undefined
        }
        let loggedIn=true;

        const vmail=localStorage.getItem("vmail");
        if(vmail==null){
          loggedIn=false;
        }
        this.state={
          loggedIn
        }

        }

        componentDidMount(){
            console.log(localStorage.getItem("vmail"))
            
          
            axios.get('https://2e75e23a.ngrok.io/vendor/'+localStorage.getItem("vmail")).then((VendorData)=>{
            // console.log(adminData.data);
            this.setState({VendorObject: VendorData.data})
            })

            axios.get('https://2e75e23a.ngrok.io/invoice/view').then((InvoiceData)=>{
                // console.log(adminData.data);
                this.setState({InvoiceObject: InvoiceData.data})
                })

         

            }

            state = {
                redirect: false
              }
          
          
              setRedirect = () => {
                this.setState({
                  redirect: true
                })
              }
          
          
              renderRedirect = () => {
                if (this.state.redirect) {
                  return <Redirect to='/vendorlogin' />
                }
              }
              renderRedirect2 = () => {
                if (this.state.redirect) {
                    return <Redirect to='/Invupl' />
                  }
                }


        render()
            {
              if(this.state.loggedIn==false)
            {
              alert("you need to login first");
              return <Redirect to='/'/>
            }

              let {VendorObject} = this.state;
              let {InvoiceObject} = this.state;
             

              return(

                <div>
                    {this.renderRedirect()}
                    <div align="right">
                  
                    <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out" onClick={this.setRedirect}></Button> 
                    </div>


        <Segment>
            <Grid columns={2} relaxed='very'>
                <Grid.Column>

                <Divider horizontal>
                    <Header as="h4">
                         <Icon name="address card" />
                         Vendor Details
                    </Header>
                </Divider>

                {VendorObject && VendorObject.map(obj =>{

                    return(

                <div>

                    
                    

                    <div>
                        <div align = "left" style={{ width: "70%", marginTop: "5%", marginLeft:"10%"}}>
    
                            <Table definition>
                            <Table.Body>
                                <Table.Row>
                                <Table.Cell width={2}>Name</Table.Cell>
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
                        
                        </div>
      {this.renderRedirect2()}
      <div align="center" >
      <Button style={{backgroundColor:"lime", marginTop: "5%"}} icon="upload" content="Invoice Upload" onClick={this.setRedirect}></Button>
      </div>

                </div>

                </div>
                
                    )
                    }    
                )
                }
            </Grid.Column>

            <GridColumn>

            <Divider horizontal>
                    <Header as="h4">
                         <Icon name="clipboard list" />
                         Your Invoices
                    </Header>
            </Divider>

            <Table>

                <Table.Header>
                        <Table.Cell width={1}>Invoice No</Table.Cell>
                        <Table.Cell width={2}>Date</Table.Cell>
                        <Table.Cell width={2}>Due Date</Table.Cell>
                        <Table.Cell width={2}>Amount</Table.Cell>
                        <Table.Cell width={2}>Payment Status</Table.Cell>
                </Table.Header>
            </Table>

            {InvoiceObject && InvoiceObject.map(obj1 =>{
                return (
                    
    
                        <Table celled>
                    
                    
                  
                  <Table.Body>
                  
                  <Table.Row>
                    <Table.Cell width={1}>{obj1.invoiceno}</Table.Cell> 
                    <Table.Cell width={2}>{obj1.date}</Table.Cell>
                    <Table.Cell width={2}>{obj1.duedate}</Table.Cell>
                    <Table.Cell width={2}>{obj1.amount}</Table.Cell>
                    <Table.Cell width={2}>{obj1.status}</Table.Cell>
                  
                  </Table.Row>
    
                  </Table.Body>
                  
                </Table>
    
                    
    
                       );
                }
                )
                }
            


            </GridColumn>
            

            </Grid>

            </Segment>

                </div>
              );


            }

   


}

export default VendorHome;