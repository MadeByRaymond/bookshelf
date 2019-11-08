const users = (state={},action) =>{
  switch (action.type) {
    case 'LOG_USER':
      return {...state,login:action.payload};
      break;
    case 'AUTH':
      return {...state,auth:action.payload};
      break;
    case 'REGISTER_USER':
      return {...state,newuser:action.payload};
      break;
    case 'LOGOUT':
      return {...state,newuser:action.payload,login:action.payload,auth:action.payload,allusers:action.payload};
      break;
    case 'ALL_USERS':
      return {...state,allusers:action.payload};
      break;
    default:
      return state;
  }
}

export default users;