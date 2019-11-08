import React, { Component } from 'react'; 
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'
import {getSingleBook,editReview,deleteReview,clearReview} from '../../actions';

 class AddBook extends Component{ 
   state = {
      formdata:{
        name:"",
        author:"",
        review:"",
        pages:"",
        rating:"",
        price:"",
        _id:this.props.match.params.id
      }
   } 
   
   componentWillMount(){
     this.props.dispatch(getSingleBook(this.props.match.params.id));
     console.log(this.props);
   }
   
   componentWillUnmount(){
     this.props.dispatch(clearReview());
   }
   
   componentWillReceiveProps(newProps){
     if (newProps.review.deleted) {
       // DO NOTHING
     } else if (newProps.review.updated) {
       let doc = newProps.review.updated.doc
       this.setState({formdata:{
         name:doc.name,
         author:doc.author,
         review:doc.review,
         pages:doc.pages,
         rating:doc.rating,
         price:doc.price,
         _id:this.props.match.params.id
       }});
     }else if (newProps.review.info) {
       this.setState({formdata:{
         name:newProps.review.info.name,
         author:newProps.review.info.author,
         review:newProps.review.info.review,
         pages:newProps.review.info.pages,
         rating:newProps.review.info.rating,
         price:newProps.review.info.price,
         _id:this.props.match.params.id
       }});
     } 
   }
   
   
   submitForm = (e) =>{
     e.preventDefault();
     console.log(this.state.formdata);
     this.props.dispatch(editReview(this.state.formdata))
     
   }
   
   handleInput = (e,name) =>{
     const newFormData = {...this.state.formdata}
     newFormData[name] = e.target.value;
     this.setState({formdata:newFormData});
   }
   
   deletePost = (e) =>{
     e.preventDefault();
     this.props.dispatch(deleteReview(this.props.match.params.id))
   }
   
   statusAlert(){
     let review = this.props.review;
     
     if (review.deleted) {
       if (review.deleted.success === true) {
        return (
          <div className="red_tag">
            Review Deleted <span style={{display:'none'}}>{
              setTimeout(() =>{
                this.props.history.push('/user/user-reviews');
              },2000)
            }</span>
          </div>
        )
       }else {
         return (
           <div className="red_tag">
             <div>Oops! Review did not delete successfully</div>
             <div>Refresh and try again!</div>
           </div>
         )
       }
     }else if (review.updated) {
       if (review.updated.success === true) {
        return (
          <div className="edit_confirm">
            Review updated, <Link to={`/books/${review.updated.doc._id}`}>Click here to view your post</Link>
          </div>
        )
      }else {
        return (
          <div className="red_tag">
            Oops! Review did not updated
          </div>
        )
      }
     } 
   }

   render(){
     console.log(this.props);
     let data = this.state.formdata;
     return(
       <div className="rl_container article">
          {this.statusAlert()}
          <form onSubmit={this.submitForm}>
            <h2>Edit your review</h2>
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
                <option val="1">1</option>
                <option val="2">2</option>
                <option val="3">3</option>
                <option val="4">4</option>
                <option val="5">5</option>
              </select>
            </div>
            <div className="form_element">
              <input type="number" placeholder="Enter price" value={data.price} onChange={(e) =>this.handleInput(e,'price')} />
            </div>
            <button type="submit">Save Edit</button>
            <div className="delete_post"><div className="button" onClick={this.deletePost}>Delete Review</div></div>
          </form>
       </div>
     );
   }

 }
 
 const mapStateToProps = (state) => {
    return {
      review:state.books
    }
  }
 
 

 export default connect(mapStateToProps)(AddBook);