import React, {Component} from 'react';
import { Redirect,Link } from 'react-router-dom'
import {Button, Divider, Header, Icon, Table ,Grid,Segment, GridColumn,Image} from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import axios from 'axios'
import URLs from '../../../config'
import { Document, Page } from 'react-pdf';


class VendorHome extends Component
{
    constructor(props){
        super(props);

               
        this.state = {
          cpname: ''
      }
      this.state = {
        ventype: ''
    }
    this.state = {
      vservice: ''
  }
  this.state = {
    vaddress: ''
}
this.state = {
  vptype: ''
}
this.state = {
  pan: ''
}
this.state = {
  gst: ''
}
this.state = {
  vmail: ''
}
this.state = {
  vmob: ''
}
this.state = {
  file:''
}

this.state = {filename:''};



  //       this.state = {
  //         date: ''
  //     }

  //     this.state = {
  //       duedate: ''
  //   }

  //   this.state = {
  //     amount: ''
  // }

        }

      componentDidMount(){
          axios.get('https://51b63bc5.ngrok.io/vendor/'+this.props.location.state.email).then((adminData)=>{
          //console.log(adminData.data[0].cpname);
          this.setState({cpname: adminData.data[0].cpname})
          this.setState({ventype:adminData.data[0].ventype})
          this.setState({vservice:adminData.data[0].vservice})
          this.setState({vaddress:adminData.data[0].vaddress})
          this.setState({vptype:adminData.data[0].vptype})
          this.setState({pan:adminData.data[0].pan})
          this.setState({gst:adminData.data[0].gst})
          this.setState({vmail:adminData.data[0].vmail})
          this.setState({vmob:adminData.data[0].vmob})
          this.setState({file:adminData.data[0].file})
          this.setState({filename: adminData.data[0].filename})
         console.log(this.state.file)
         let files = this.state.file
          
          })
          axios.get('https://51b63bc5.ngrok.io/invoice/byemail/'+this.props.location.state.email).then((vendorData)=>{
          console.log(vendorData);
          this.setState({vendorObject : vendorData.data})
           
          })   

        }

        state = {
            redirect: false
        }
        
        state = {
          redirect2: false
      }

        
        setRedirect = () => {
            this.setState({
            redirect: true
            })
        }

        setRedirect2 = () => {
          this.setState({
          redirect2 : true
          })
      }
            
        renderRedirect = () => {
             if (this.state.redirect) {
                 return <Redirect to='/' />
             }
        }
        renderRedirect2 = () => {
             if (this.state.redirect2) {
                 return <Redirect to='/InvoiceUpload' />
             }
        }


        render()
            { 
              
              let {vendorObject} = this.state;
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
                                                    <div>
                              <div>
                        <div align = "left" style={{ width: "70%", marginTop: "5%", marginLeft:"10%"}}>
    
                            <Table definition>
                            <Table.Body>
                                <Table.Row>
                                <Table.Cell width={2}>Name</Table.Cell>
                                <Table.Cell>{this.state.cpname}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>Entity Type</Table.Cell>
                                <Table.Cell>{this.state.ventype}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>Type of Service</Table.Cell>
                                <Table.Cell>{this.state.vservice}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>Address</Table.Cell>
                                <Table.Cell>{this.state.vaddress}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>Partner Type</Table.Cell>
                                <Table.Cell>{this.state.vptype}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>PAN No</Table.Cell>
                                <Table.Cell>{this.state.pan}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>GSTIN</Table.Cell>
                                <Table.Cell>{this.state.gst}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>Email-ID</Table.Cell>
                                <Table.Cell>{this.state.vmail}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>Mobile No</Table.Cell>
                                <Table.Cell>{this.state.vmob}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                <Table.Cell>View Documents</Table.Cell>
                                <Table.Cell>  <a target="_blank" rel="noreferrer noopener" data-qa="message_attachment_title_link" class="c-link c-message_attachment__title_link" href={this.state.file}>{this.state.filename}<span dir="auto"></span></a></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            </Table>
                            {/* <Document pdf file src={this.state.filename} size='small' /> */}
                            {/* <Link href={this.state.file} target="blank">view</Link> */}
                            {/* <Link target="_blank" to={this.state.file}  query={{file: this.props.file}} >{this.state.filename}</Link> */}
                            
                            {/* <a target="_blank" rel="noreferrer noopener" data-qa="message_attachment_title_link" class="c-link c-message_attachment__title_link" href={this.state.file}>{this.state.filename}<span dir="auto"></span></a> */}

                        </div>
      {this.renderRedirect2()}
      <div align="center" >
      <Button style={{backgroundColor:"lime", marginTop: "5%"}} icon="upload" content="Invoice Upload" onClick={this.setRedirect2}></Button>
      </div>

                </div>

                </div>

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
                        {/* <Table.Cell width={2}>Payment Status</Table.Cell> */}
                </Table.Header>
            </Table>

            {vendorObject && vendorObject.map(obj =>{

              return(
    <div>

            <Table celled>
                    
                    
                  
                  <Table.Body>
                  
                  <Table.Row>
                    <Table.Cell width={1}></Table.Cell> 
                    <Table.Cell width={2}>{obj.date}</Table.Cell>
                    <Table.Cell width={2}>{obj.duedate}</Table.Cell>
                    <Table.Cell width={2}>{obj.amount}</Table.Cell>
                    <Table.Cell width={2}></Table.Cell>
                  
                  </Table.Row>
    
                  </Table.Body>
                  
                </Table>
    </div>
                    
    )
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