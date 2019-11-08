import React, { Component } from 'react'; 
import {connect} from 'react-redux'

import {getSingleBook, clearSingleBook} from '../actions';

 class BookConatiner extends Component{ 
   
   componentWillMount(){
     this.props.dispatch(getSingleBook(this.props.match.params.id));
   }
   
   componentWillUnmount(){
     this.props.dispatch(clearSingleBook());
   }
   
   renderBook = (BookInfo,Reviewer) =>{
     // console.log(BookInfo);
     return BookInfo ?
      
      <div className="br_container">
        <div className="br_header">
          <h2>{BookInfo.name}</h2>
          <h5>{BookInfo.author}</h5>
          <div className="br_reviewer">
            <span>Review by:</span> {Reviewer.name} {Reviewer.lastname}
          </div>
        </div>
        <div className="br_review">
          {BookInfo.review}
        </div>
        <div className="br_box">
          <div className="left">
            <div><span>Pages: </span>{BookInfo.pages}</div>
            <div><span>Price: </span>{BookInfo.price}</div>
          </div>
          <div className="right"><span>Rating: </span><div>{BookInfo.rating}/5</div></div>
        </div>
      </div>
      
     : <div className="loader">Loading Book...</div>
   }
      
   render(){
     
     return(
       <div>
          {this.renderBook(this.props.book.info,this.props.book.reviewer)}
       </div>
     );
   }

 }
 
 const mapStateToProps = (state) => {
    return {
      book:state.books
    }
  }
 
 export default connect(mapStateToProps)(BookConatiner);