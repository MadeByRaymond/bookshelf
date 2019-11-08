import React, { Component } from 'react'; 
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

import SideNav from './Sidenav/sidenav';


 class Header extends Component{ 
   state = {
      showNav:false
   } 
   
   toggleNav = (status) => {
      this.setState({
        showNav: status
      })
   }

   render(){
     return(
       <header>
          <div className="open_nav">
            <FontAwesome name="bars"
              style={{
                color:'#fff',
                padding:'10px 10px 15px',
                cursor:'pointer',
                position:'relative',
                zIndex: '1'
              }}
              onClick={() => this.toggleNav(true)}
            />
          
            <SideNav 
              showNav={this.state.showNav}
              onHideNav={() => this.toggleNav(false)}
            />
            
            <Link to="/" className="logo">
              The Book Shelf
            </Link>
          </div>
       </header>
     );
   }

 }

 export default Header;