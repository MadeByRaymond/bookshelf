import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers'

import Route from './Routes'

const createMiddlewareStore = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

const Root = () =>{
  return(
    <Provider store={createMiddlewareStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <BrowserRouter>
        <Route/>
      </BrowserRouter>
    </Provider>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));
