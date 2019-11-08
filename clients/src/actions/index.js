import axios from 'axios';

//*============ BOOKS ============*//

const getBooks = (limit=10,start=0,order='asc') =>{
  const request = axios.get(`/api/getBooks?limit=${limit}&skip=${start}&order=${order}`).then((res) =>{
    return res.data
  });
  
  return {
    type:'GET_BOOKS',
    payload:request
  }
}


const getSingleBook = (id) =>{
  const request = axios.get(`/api/getBook_single?id=${id}`).then((res) =>{
    return axios.get(`/api/getReviewer?id=${res.data.ownerId}`).then((res2) =>{
      // console.log([res.data,res2.data]);
      return [res.data,res2.data]
    }).catch((err) =>{
      return [res.data,{name: "Not Available", lastname: null}]
    })
  });
  
  return {
    type:'GET_SINGLE_BOOK',
    payload:request
  }
}

const clearSingleBook = () =>{
  return {
    type:'CLEAR_SINGLE_BOOK',
    payload:null
  }
}

const getReviews = (id,limit=10,start=0,order='asc') =>{
  const request = axios.get(`/api/user_posts?user=${id}&limit=${limit}&skip=${start}&order=${order}`).then((res) =>{
    return res.data
  });
  
  return {
    type:'GET_REVIEWS',
    payload:request
  }
}

const editReview = (updatebook) =>{
  const request = axios.post('/api/book_update',updatebook).then((res) =>{
    return res.data
  });
  
  return {
    type:'EDIT_REVIEW',
    payload:request
  }
}

const deleteReview = (id) =>{
  const request = axios.post(`/api/delete_book?id=${id}`).then((res) =>{
    return res.data
  });
  
  return {
    type:'DELETE_REVIEW',
    payload:request
  }
}

const clearReview = () =>{
  return {
    type:'CLEAR_REVIEW',
    payload:null
  }
}


//*============ USER ============*//

const login = (email,password) =>{
  let loginDetails = {email,password};
  const login = axios.post('/api/login',loginDetails).then((res) =>{
    return res.data;
  });
  
  return {
    type:'LOG_USER',
    payload:login
  }
}

const logout = () =>{
  axios.get('/api/logout').then((res) =>{
    return res.data;
  });
  
  return {
    type:'LOGOUT',
    payload:null
  }
}

const auth = () =>{
  const request = axios.get('/api/auth').then((res) =>{
    return res.data;
  });
  
  return {
    type:'AUTH',
    payload:request
  }
}

const register = (UserData) =>{
  const reg = axios.post('/api/register',UserData).then((res) =>{
    return res.data;
  });
  
  return {
    type:'REGISTER_USER',
    payload:reg
  }
}

const getUsers = () =>{
  const req = axios.get('/api/users').then((res) =>{
    return res.data;
  });
  
  return {
    type:'ALL_USERS',
    payload:req
  }
}



export {getBooks,getSingleBook,clearSingleBook,getReviews,editReview,deleteReview,clearReview,login,logout,auth,register,getUsers};