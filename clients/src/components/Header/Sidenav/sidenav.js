import React from 'react';
import SimpleSideNave from 'react-simple-sidenav';
import SideNavItems from './sidenavitems';

 const SideNav = (props) => {
   return (
     <SimpleSideNave
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      openFromLeft={true}
      navStyle={{
        background:'#242424',
        width:'80%',
        maxWidth:'320px'
      }}
     >
        <SideNavItems hideNav={props.onHideNav} />
     </SimpleSideNave>
   );
 }

 export default SideNav;