import React from 'react';

 const User = (props) => {
   return (
     <div className="user_container">
        <div className="avatar">
          <img alt="avatar" src="/images/avatar.png" />
        </div>
        <div className="nfo">
          <div><span>Name:</span> {props.user.auth.name}</div>
          <div><span>Lastname:</span> {props.user.auth.lastname}</div>
          <div><span>Email:</span> {props.user.auth.email}</div>
        </div>
     </div>
   );
 }

 export default User;