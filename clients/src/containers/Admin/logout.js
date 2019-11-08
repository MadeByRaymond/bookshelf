import React, { Component } from 'react'; 
import {connect} from 'react-redux';
import {logout} from '../../actions'

 class Logout extends Component{ 
   
   componentWillMount(){
     this.props.dispatch(logout());
   }
   
   redirect = (user) =>{
     console.log(user);
     if (user.auth == null) {
       setTimeout(() =>{
         this.props.history.push('/');
       },2000);
     }
     
   }

   render(){
     // console.log(this.props.user);
     this.redirect(this.props.user);
     return(
       <div className="logout_container">
        <h1>Sorry to see you go :(</h1>
       </div>
     );
   }

 }
 
 const mapStateToProps = (state) => {
    return {
      user:state.users
    }
  }
 
 

 export default connect(mapStateToProps)(Logout);