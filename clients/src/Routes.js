import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/home';
import BookInfo from './components/Books';
import Login from './containers/Admin/login';
import Profile from './components/Admin';
import AddReview from './containers/Admin/add';
import EditReview from './containers/Admin/edit';
import Reviews from './containers/Admin/reviews';
import Register from './containers/Admin/register';
import Logout from './containers/Admin/logout';
import NOTFOUND404 from './components/404/notfound'

import Layout from './hoc/layout';
import Auth from './hoc/auth';

 const Routes = () => {
   return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home,true,true)} />
        <Route path="/books/:id" exact component={Auth(BookInfo,true,true)} />
        <Route path="/login" exact component={Auth(Login,false,true)} />
        <Route path="/user" exact component={Auth(Profile,true,false)} />
        <Route path="/user/add" exact component={Auth(AddReview,true,false)} />
        <Route path="/user/user-reviews" exact component={Auth(Reviews,true,false)} />
        <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true,false)} />
        <Route path="/register" exact component={Auth(Register,true,false)} />
        <Route path="/user/logout" exact component={Auth(Logout,true,false)} />
        // 404 Route //
        <Route path="*" component={Auth(NOTFOUND404,true,true)} />
        // 404 Route //
      </Switch>
    </Layout>
   );
 }

 export default Routes;