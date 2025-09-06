/** @format */

import React from "react";
import Spotify from "../Utils/Spotify.js";

class Profile extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   displayName: localStorage.getItem("user_name") || "",
   email: localStorage.getItem("email") || "",
  };
 }
 async getUserProfile() {
  const profile = await Spotify.getTokenThenId();
  console.log(profile);
 }

 render() {
  return (
   <div>
    <button onClick={this.getUserProfile.bind(this)}>Get Profile</button>
    <section id="profile">
     <h2>
      <span id="displayName">{this.state.displayName}</span>
     </h2>
     <span id="avatar"></span>
     <ul>
      <li>
       <span id="email">{this.state.email}</span>
      </li>
     </ul>
    </section>
   </div>
  );
 }
}

export default Profile;
