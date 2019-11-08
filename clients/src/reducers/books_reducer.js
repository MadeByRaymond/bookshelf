const books = (state={},action) =>{
  switch (action.type) {
    case 'GET_BOOKS':
      return {...state, list: action.payload};
      break;
    case 'GET_SINGLE_BOOK':
      return {...state, info: action.payload[0], reviewer: action.payload[1]};
      break;
    case 'CLEAR_SINGLE_BOOK':
      return {...state, info: action.payload, reviewer: action.payload};
      break;
    case 'GET_REVIEWS':
      return {...state, my_reviews: action.payload};
      break;
    case 'EDIT_REVIEW':
      return {...state, updated: action.payload};
      break;
    case 'DELETE_REVIEW':
      return {...state, deleted: action.payload};
      break;
    case 'CLEAR_REVIEW':
      return {...state, updated: action.payload,deleted: action.payload,info: action.payload, reviewer: action.payload};
      break;
    default:
      return state;
  }
}

export default books;

