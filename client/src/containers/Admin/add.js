import React, { Component } from 'react'; 
import {Link} from 'react-router-dom';
import axios from 'axios'

 class AddBook extends Component{ 
   state = {
      formdata:{
        name:"",
        author:"",
        review:"",
        pages:"",
        rating:"1",
        price:"",
        ownerId:this.props.user.auth.id
      }
   } 
   
   clearFormData = this.state.formdata;
   
   submitForm = (e) =>{
     e.preventDefault();
     console.log(this.state.formdata);
     axios.post('/api/book',this.state.formdata).then((res) =>{
       if (res.data.post) {
         this.setState({formdata:this.clearFormData,added:res.data});
       }
     }).catch((e) =>{
       console.log(e);
     });
     
   }
   
   handleInput = (e,name) =>{
     const newFormData = {...this.state.formdata}
     newFormData[name] = e.target.value;
     this.setState({formdata:newFormData});
   }
   
   statusAlert(){
     let added = this.state.added;
     
     if (added) {
       if (added.post === true) {
        return (
          <div className="edit_confirm">
            Review added, <Link to={`/books/${added.bookId}`}>Click here to view your post</Link>
          </div>
        )
      }else {
        return (
          <div className="red_tag">
            Oops! Review was not added successfully
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
            <h2>Add a review</h2>
            <div className="form_element">
              <input type="text" placeholder="Enter name" value={data.name} onChange={(e) =>this.handleInput(e,'name')} />
            </div>
            <div className="form_element">
              <input type="text" placeholder="Enter author" value={data.author} onChange={(e) =>this.handleInput(e,'author')} />
            </div>
            <textarea placeholder="Enter review" value={data.review} onChange={(e) =>this.handleInput(e,'review')} />
            <div className="form_element">
              <input type="number" placeholder="Enter pages" value={data.pages} onChange={(e) =>this.handleInput(e,'pages')} />
            </div>
            <div className="form_element">
              <select value={data.rating} onChange={(e) =>this.handleInput(e,'rating')} >
                <option val="1" >1</option>
                <option val="2">2</option>
                <option val="3">3</option>
                <option val="4">4</option>
                <option val="5">5</option>
              </select>
            </div>
            <div className="form_element">
              <input type="number" placeholder="Enter price" value={data.price} onChange={(e) =>this.handleInput(e,'price')} />
            </div>
            <button type="submit">Review</button>
          </form>
       </div>
     );
   }

 }

 export default AddBook;