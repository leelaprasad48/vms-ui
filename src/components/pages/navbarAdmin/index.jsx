import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class NavbarAdmin extends Component {
  state = { activeItem: 'home' }

  handleItemClickHome = (e, { name }) => 
  {this.setState({ activeItem: name });
  this.props.history.push({
    pathname: '/admin/adminHome',
  })
}


handleItemClick2 = (e, { name }) => 
{this.setState({ activeItem: name });
this.props.history.push({
  pathname: '/admin/addVendor',
})
}

handleItemClick3 = (e, { name }) => 
{this.setState({ activeItem: name });
this.props.history.push({
  pathname: '/admin/adminPayment',
})
}

handleItemClick4 = (e, { name }) => 
{this.setState({ activeItem: name });
this.props.history.push({
  pathname: '/logoutAdmin',
})
}

  componentDidMount()
  {
      const jwt=localStorage.getItem("jwtTokenAdmin");
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
          <Menu.Item icon="home" name='home' active={activeItem === 'home'} onClick={this.handleItemClickHome} />
          <Menu.Item icon="add user"
            
            name='Add Vendor'
            active={activeItem === 'Add Vendor'}
            onClick={this.handleItemClick2}
          />
          <Menu.Item
            
            name='Invoice Payment'
            icon="rupee sign"
            active={activeItem === 'Invoice Payment'}
            onClick={this.handleItemClick3}
          />
          <Menu.Item 
            position='right'
            icon="sign out alternative"
            name='SignOut'
            active={activeItem === 'SignOut'}
            onClick={this.handleItemClick4}
          />
        </Menu>
      </Segment>
      </div>
    )
  }
}
