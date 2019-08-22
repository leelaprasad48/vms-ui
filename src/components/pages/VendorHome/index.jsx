import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import {Divider, Header, Icon, Table ,Grid,Segment,GridColumn,Button,Embed,Modal,Image} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import URLs from '../../../config'
import Spinner from 'react-spinner-material';



class VendorHome extends Component
{
    constructor(props){
        super(props);
        this.state={
            InvoiceObject : undefined,
          }
        
          this.state = {
              VendorObject: undefined
          }


          const vmail=localStorage.getItem("vmail");
          
        }

        componentDidMount(){
            console.log(localStorage.getItem("vmail"))
            
            
            
            axios.get(URLs.baseURL+'/vendor/'+localStorage.getItem("vmail"),{ headers: {Authorization :''+localStorage.getItem("jwtToken")}}).then((VendorData)=>{
            
            this.setState({VendorObject: VendorData.data})
            })
              .catch(err=>{
              localStorage.removeItem('jwtToken')
              localStorage.removeItem('vmail')
              this.props.history.push('/')});

            
            axios.get(URLs.baseURL+'/invoice/byemail/'+localStorage.getItem("vmail"),{ headers: {Authorization : ''+localStorage.getItem("jwtToken")}}).then((InvoiceData)=>{
                
            this.setState({InvoiceObject: InvoiceData.data})
            })
            .catch(err=>{
              localStorage.removeItem('jwtToken')
              localStorage.removeItem('vmail')
              this.props.history.push('/')});

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
                  return <Redirect to='/' />
                }
              }
              renderRedirect2 = () => {
                if (this.state.redirect) {
                    return <Redirect to='/app/InvoiceUpload' />
                  }
                }

              handleFileClick=(e,filename)=>{
                return(
                  <div>
                  <Embed
                  icon='right circle arrow'
                  placeholder='/images/image-16by9.png'
                  url={filename}
                /></div>
              
                );
              }


        render()
            {
              let {VendorObject} = this.state;
              let {InvoiceObject} = this.state;

              if(this.state.VendorObject=== undefined)
              {
                return(
                     <div align="center" style={{marginTop:"15%"}}>
                 <Spinner size={100} spinnerColor={"#333"} spinnerWidth={10} visible={true} />
              </div>
                )

              }
             
              return(

                <div>
                    {this.renderRedirect()}
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
                                 <Table.Row>
                                <Table.Cell>View Documents</Table.Cell>
                                <Table.Cell><Modal trigger={<Button icon="download" content={obj.filename} onClick={(e)=>this.handleFileClick(e,obj.file)}></Button>  }>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content>
      
      
      <Embed active={true}
                  icon='right circle arrow'
                  placeholder='/images/image-16by9.png'
                  url={obj.file}
                />
      
    </Modal.Content>
  </Modal></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            </Table>
                            {/* <a target="_blank" rel="noreferrer noopener" data-qa="message_attachment_title_link" class="c-link c-message_attachment__title_link" href={obj.file}>{obj.filename}<span dir="auto"></span></a> */}
                        
                        </div>

                        

                  
      {this.renderRedirect2()}

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
                    <Table.Cell width={1}>{obj1.id}</Table.Cell> 
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
