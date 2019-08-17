import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClickHome = (e, { name }) => 
  {this.setState({ activeItem: name });
  this.props.history.push({
    pathname: '/app/vendorHome',
  })
}


handleItemClick2 = (e, { name }) => 
{this.setState({ activeItem: name });
this.props.history.push({
  pathname: '/app/invoiceUpload',
})
}

handleItemClick3 = (e, { name }) => 
{this.setState({ activeItem: name });
this.props.history.push({
  pathname: '/logout',
})
}

  componentDidMount()
  {
      const jwt=localStorage.getItem('jwtToken');
      if(!jwt)
      {   alert("Login First");
          this.props.history.push('/')
      }
  }

  render() {

    const { activeItem } = this.state

    return (
        <div>
        
      <Segment inverted style={{opacity:"0.7"}}>
        <Menu inverted secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClickHome} />
          <Menu.Item
            
            name='InvoiceUpload'
            active={activeItem === 'InvoiceUpload'}
            onClick={this.handleItemClick2}
          />
          <Menu.Item 
            position='right'
            name='SignOut'
            active={activeItem === 'SignOut'}
            onClick={this.handleItemClick3}
          />
        </Menu>
      </Segment>
      </div>
    )
  }
}
