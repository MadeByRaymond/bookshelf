import React, { Component } from 'react';
import {connect} from 'react-redux';
import {register,getUsers} from '../../actions';

 class Register extends Component{ 
   state = {
      formdata:{
        name:"",
        lastname:"",
        email:"",
        password:""
      }
   } 
   
   clearFormData = this.state.formdata;
   
   componentWillMount(){
     this.props.dispatch(getUsers());
   }
   
   componentWillUnmount(){
     // this.props.dispatch(clearReview());
   }
   
   componentWillReceiveProps(newProps){
     let newuser = newProps.users.newuser
      if (newuser && newuser.success === true) {
        this.setState({formdata:this.clearFormData});
      }
   }
   
   
   submitForm = (e) =>{
     e.preventDefault();
     // console.log(this.state.formdata);
     this.props.dispatch(register(this.state.formdata));
     
   }
   
   handleInput = (e,name) =>{
     const newFormData = {...this.state.formdata}
     newFormData[name] = e.target.value;
     this.setState({formdata:newFormData});
   }
   
   allUsers = (users) =>{
     return users.allusers ? 
        users.allusers.map((item) =>{
          return (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
            </tr>
          )
        })
      : null
   }
   
   statusAlert(){
     let user = this.props.users;
     // console.log(user);
     if (user.newuser) {
       if (user.newuser.success === true) {
        return (
          <div className="edit_confirm">
            New User Added Successfully
          </div>
        )
       }else {
         return (
           <div className="red_tag">
             <div>Oops! User was not added succesfully</div>
             <div>Check all field and try again!</div>
           </div>
         )
       }
     } 
   }

   render(){
     let data = this.state.formdata;
     return(
       <div className="rl_container article">
         {this.statusAlert()}
          <form onSubmit={this.submitForm}>
            <h2>Add user</h2>
            <div className="form_element">
              <input type="text" placeholder="Enter name" value={data.name} maxLength="100" onChange={(e) =>this.handleInput(e,'name')} />
            </div>
            <div className="form_element">
              <input type="text" placeholder="Enter lastname" value={data.lastname} maxLength="100" onChange={(e) =>this.handleInput(e,'lastname')} />
            </div>
            <div className="form_element">
              <input type="email" placeholder="Enter email" value={data.email} onChange={(e) =>this.handleInput(e,'email')} />
            </div>
            <div className="form_element">
              <input type="password" placeholder="Enter password" value={data.password} minLength="6" onChange={(e) =>this.handleInput(e,'password')} />
            </div>
            <button type="submit">Review</button>
          </form>
          
          <div className="current_users">
            <h4>Current Users</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Lastname</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.allUsers(this.props.users)}
              </tbody>
            </table>
          </div>
          
       </div>
     );
   }

 }
 
 const mapStateToProps = (state) => {
    return {
      users:state.users
    }
  }
 
 

 export default connect(mapStateToProps)(Register);