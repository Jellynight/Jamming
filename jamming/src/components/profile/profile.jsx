/** @format */

import React from "react";
import Spotify from "../Utils/Spotify.js";

class Profile extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   displayName: "",
   id: "",
   email: "",
   imgUrl: "",
  };
 }
 async getUserProfile() {
  try {
   const profile = await Spotify.getUserId();
   this.state({
    displayName: profile.display_name,
    id: profile.id,
    email: profile.email,
    imgUrl: profile.images[0].url,
   });
  } catch (error) {
   console.error("Error fetching user profile:", error);
  }
 }

 componentDidMount() {
  this.getUserProfile();
 }
 render() {
  return (
   <div>
    <section id="profile">
     <h2>
      <span id="displayName">{this.state.displayName}</span>
     </h2>
     <span id="avatar">
     </span>
     <ul>
      <li>
       User ID: <span id="id">{this.state.id}</span>
      </li>
      <li>
       Email: <span id="email">{this.state.email}</span>
      </li>
      <li>
       Profile Image: <span id="imgUrl">{this.state.imgUrl}</span>
      </li>
     </ul>
    </section>
   </div>
  );
 }
}

export default Profile;
