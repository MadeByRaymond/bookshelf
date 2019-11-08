import React, { Component } from 'react'; 
import {connect} from 'react-redux';

import {login} from '../../actions'

 class Login extends Component{ 
   
   state = {
     email: '',
     password:'',
     success: false,
     error: ''
   }
   
   // componentWillReceiveProps(newprop){
   //   if(newprop.user.login.isAuth){
   // 
   //   }
   // }
   
   submitForm = (e) =>{
     e.preventDefault();
     this.props.dispatch(login(this.state.email,this.state.password))
   }
   
   errorMessage = () =>{
       if (this.props.user.login) {
         if (this.props.user.login.isAuth === false) {
           return <div className="error">{this.props.user.login.message}</div>
         } else if (this.props.user.login.isAuth === true) {
           return (
             <div>
               <div className="conf_link">{this.props.user.login.message}</div>
                   <span style={{display:'none'}}>
                       {
                         setTimeout(() =>{
                           this.props.history.push('/user');
                         },3000)
                       }
                   </span>
              </div>
         )
         }
       }
   }

   render(){
     // console.log(this.props.user);
     return(
       <div className="rl_container">
          <form onSubmit={this.submitForm}>
            <h2>User Login</h2>
            {this.errorMessage()}
            <div className="form_element">
              <input type="email" placeholder="Enter your email" value={this.state.email} onChange= {(evn) =>{
                this.setState({email:evn.target.value})
              }} />
            </div>
            <div className="form_element">
              <input type="password" placeholder="Enter your password" value={this.state.password} onChange= {(evn) =>{
                this.setState({password:evn.target.value})
              }} />
            </div>
            <button type="submit">Login</button>
          </form>
       </div>
     );
   }

 }
 
 const mapStateToProps = (state) => {
    return {
      user:state.users
    }
  }
 
 

 export default connect(mapStateToProps)(Login);