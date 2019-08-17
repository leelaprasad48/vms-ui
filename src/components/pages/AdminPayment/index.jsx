import React, {Component} from 'react';
import { Input, Button, Dropdown, Form } from "semantic-ui-react";
import 'semantic-ui/dist/semantic.min.css';
import './custom.css';

class AdminPayment extends Component{
    render(){
        return(
            <div>
            <div align="right">
                    <Button style={{backgroundColor:"red"}}icon="sign out alternative" content="Sign Out"></Button> 
                </div>
            <Form id="body">
            <Dropdown
                placeholder="Select Vendor"
                label='Select Vendor'
                clearable options selection />
            <Form.Field required id="test">
              <label>Invoice Number</label>
              <input  placeholder="abcxxx" />
            </Form.Field>
            <Form.Field id="test" required>
              <label>Invoice Date</label>
              <input id="test" placeholder="dd/mm/yy" />
            </Form.Field>
            <Form.Field required>
              <label>Due Date</label>
              <Input id="test" placeholder="dd/mm/yy" />
            </Form.Field>
            <Form.Field required>
              <label>GSTIN</label>
              <Input id="test" placeholder="xxABCDExxFxAx" />
            </Form.Field>
            <Form.Field required>
              <label>Invoice Amount</label>
              <Input placeholder=" ₹ " />
            </Form.Field>
          </Form>
          
            <div>
                  <Button style={{backgroundColor:"lime"}} icon="check" content="Update Status To Paid"></Button>
            </div>
          </div>
        );
        }     
}
        export default AdminPayment
