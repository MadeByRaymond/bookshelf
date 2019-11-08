import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';

 const SideNavItems = (props) => {
   
   const navItems = [
     {
       type:'navItem',
       icon:'home',
       text:'Home',
       link:'/',
       onLogin: true,
       onLogout: true
     },
     {
       type:'navItem',
       icon:'file-text-o',
       text:'My Profile',
       link:'/user',
       onLogin: true,
       onLogout: false
     },
     {
       type:'navItem',
       icon:'file-text-o',
       text:'Add Admins',
       link:'/register',
       onLogin: true,
       onLogout: false
     },
     {
       type:'navItem',
       icon:'sign-in',
       text:'Login',
       link:'/login',
       onLogin: false,
       onLogout: true
     },
     {
       type:'navItem',
       icon:'file-text-o',
       text:'My Reviews',
       link:'/user/user-reviews',
       onLogin: true,
       onLogout: false
     },
     {
       type:'navItem',
       icon:'file-text-o',
       text:'Add Reviews',
       link:'/user/add',
       onLogin: true,
       onLogout: false
     },
     {
       type:'navItem',
       icon:'sign-out',
       text:'Logout',
       link:'/user/logout',
       onLogin: true,
       onLogout: false
     }
   ];
   
   const element = (item, iteration) =>{
     return (
       <div key={iteration} className={item.type}>
         <Link to={item.link} onClick={props.hideNav}>
          <FontAwesome name={item.icon}/> {item.text}
         </Link>
       </div>
     );
   }
   
   const showItems = () =>{
     let auth = props.user.auth
     console.log(props);
     return navItems.map((item,i) => {
       if (auth && auth.isAuth) {
         if (item.onLogin === true) {
           return element(item,i);
         }
       } else {
         if (item.onLogout === true) {
           return element(item,i);
         }
       }
     })
   }
   
   return (
     <div>
        {showItems()}
     </div>
   );
 }
 
 const mapStateToProps = (state) => {
    return {
      user:state.users
    }
  }
 
 

 export default connect(mapStateToProps)(SideNavItems);