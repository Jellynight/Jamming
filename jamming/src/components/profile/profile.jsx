/** @format */
import React from "react";
import Spotify from "../Utils/Spotify";

class Profile extends React.Component {
 
 async login() {
  try {
   await Spotify.fetchApiCode(); // Redirect happens here
  } catch (error) {
   console.error("loginfailed", error);
   this.props.login.setState({ login: false });
  }
 }

 logout() {
  this.props.login.setState({ login: false });
  sessionStorage.clear();
  window.location.href = "https://accounts.spotify.com/en/logout";
  window.location.reload();
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
      <br />
      <br />
      {/* <img id="avatar" src="" alt="Profile Avatar" /> */}
      <span id="avatar"></span>
      <ul>
       <li>
        <span id="email">{this.props.user.email}</span>
       </li>
      </ul>
      <button className="logout" onClick={this.logout.bind(this)}>
       Logout
      </button>
     </section>
    </div>
   );
  } else {
   return (
    <div>
     <button className="login" onClick={this.login.bind(this)}>
      Welcome Login
     </button>
    </div>
   );
  }
 }
}

export default Profile;
