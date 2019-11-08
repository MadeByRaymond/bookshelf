import React, { Component } from 'react'; 
import {connect} from 'react-redux';

import {getBooks} from '../actions';

import BookItem from '../widgetsUI/book_item';

 class HomeContainer extends Component{ 
  
  itemLimit = 3;
  itemInc= 2;
  
  itemIcrementor = () =>{
    let x = this.itemLimit = this.itemInc + this.itemLimit
    return x;
  }
      
   componentDidMount(){
     this.props.dispatch(getBooks(this.itemIcrementor(),0,'asc'));
   } 
   
   renderItems = (books) =>{
     return books.list ? 
       books.list.map((item) =>{
        return (
          <BookItem {...item} key={item._id}/>
        )
       })
     : <div className="loader">Rendering Books...</div>
   }
   
   loadmore = () =>{
     this.props.dispatch(getBooks(this.itemIcrementor(),0,'asc'));
     
   }

   render(){
     // console.log(this.props);
     return(
       <div>
          {this.renderItems(this.props.books)}
          <div className="loadmore" onClick={() => this.loadmore()}> Load More </div>
       </div>
     );
   }

 }
 
 const mapStateToProps = (state) => {
    return {
      books:state.books
    }
  }
 
 

 export default connect(mapStateToProps)(HomeContainer);