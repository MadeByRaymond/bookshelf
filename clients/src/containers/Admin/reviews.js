import React, { Component } from 'react'; 
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment-js';

import {getReviews} from '../../actions';

 class Reviews extends Component{ 
   componentWillMount(){
     this.props.dispatch(getReviews(this.props.user.auth.id))
   }
   
   userPosts = (reviews) =>{
     return reviews.my_reviews ? 
        reviews.my_reviews.map((item) =>{
          return (
            <tr key={item._id}>
              <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
              <td>{item.author}</td>
              <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          )
        })
      : null
   }

   render(){
     let reviews = this.props.reviews;
     return(
       <div className="user_posts">
          <h4>Your reviews:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.userPosts(reviews)}
            </tbody>
          </table>
       </div>
     );
   }

 }
 
 const mapStateToProps = (state) => {
    return {
      reviews:state.books
    }
  }
 
 

 export default connect(mapStateToProps)(Reviews);