import React, { Component } from 'react'; 
import {auth} from '../actions'
import {connect} from 'react-redux';

export default function(RecievedClass,ifLogged,ifNotLogged,redirect='/') {
  class Auth extends Component{ 
    state = {
       loading:true
    } 
    
    componentWillMount(){
      this.props.dispatch(auth());
    }
    
    componentWillReceiveProps(nextprops){
      this.setState({loading:false});
      
      if (nextprops.user.auth) {
        if (nextprops.user.auth.isAuth) {
          if(ifLogged === false) this.props.history.push(redirect)
        } else if (!nextprops.user.auth.isAuth){
          if(ifNotLogged === false) this.props.history.push('/login')
        }
      }
    }
    
 
    render(){
      // console.log(this.props);
      if (this.state.loading) {
        return <div className="loader">loading...</div>
      }
      return(
        <RecievedClass {...this.props} user={this.props.user}/>
      );
    }
 
  }
  
  const mapStateToProps = (state) => {
     return {
       user:state.users
     }
   }
  
   return connect(mapStateToProps)(Auth);
}
