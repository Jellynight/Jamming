/** @format */
import React from "react";

import Spotify from "../Utils/Spotify";

class Profile extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   user: {
    name: sessionStorage.getItem("user_name") || "",
    email: sessionStorage.getItem("email") || "",
    login: sessionStorage.getItem("login") || false,
   },
  };
  this.logout = this.logout.bind(this);
 }

 logout() {
  // clear session data and reload app to logged out state
  sessionStorage.clear();
  window.location.href = "https://accounts.spotify.com/en/logout";
  window.location.reload();
 }

 render() {

  const loggedIn = sessionStorage.getItem("access_token");

  if (!loggedIn) {
   return (
    <button className="login" onClick={() => {Spotify.fetchApiCode(); sessionStorage.setItem("login", true);}}>
     Login with Spotify
    </button>
   );
  } else {
   return (
    <div>
     <section id="profile">
      <h2>
       <span id="displayName">Welcome {this.state.user.name}</span>
      </h2>
      <ul>
       <li>
        <span id="email">{this.state.user.email}</span>
       </li>
      </ul>
      <button className="login" onClick={this.logout}>
       Logout
      </button>
     </section>
    </div>
   );
  }
 }
}

export default Profile;
