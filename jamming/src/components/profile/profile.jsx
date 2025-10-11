/** @format */
import React from "react";

class Profile extends React.Component {
      constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
 }
 login (){
      this.props.login();
 }
 logout() {
      this.props.logout();
 }
 render() {
  console.log("Profile state:", this.props);
  if (this.props.user.login) {
   return (
    <div>
     <section id="profile">
      <h2>
       <span id="displayName">Welcome {this.props.user.name}</span>
      </h2>
      <ul>
       <li>
        <span id="email">{this.props.user.email}</span>
       </li>
      </ul>
      <button className="logout" onClick={this.logout}>
       Logout
      </button>
     </section>
    </div>
   );
  } else {
   return (
    <div>
     <button className="login" onClick={this.login}>
      Welcome Login
     </button>
    </div>
   );
  }
 }
}

export default Profile;
