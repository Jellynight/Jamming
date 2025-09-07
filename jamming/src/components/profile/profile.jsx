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
 getUserProfile() {
  Spotify.getTokenThenId();
 }
 
 componentDidMount() {
      try {
            Spotify.requestAuthorization().then(Spotify.getTokenThenId());
      } catch (error) {
            console.log(error);
      }
 }

 render() {
  return (
   <div>
    <section id="profile">
     <h2>
      <span id="displayName">Welcome {this.state.displayName}</span>
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
