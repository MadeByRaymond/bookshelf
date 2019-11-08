import {combineReducers} from 'redux';
import books from './books_reducer';
import users from './user_reducer';

const allReducers = combineReducers({
  books, users
});

export default allReducers;