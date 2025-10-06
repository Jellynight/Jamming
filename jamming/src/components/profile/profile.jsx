/** @format */
import React from "react";
import Spotify from "../Utils/Spotify";

class Profile extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   login: false,
   displayName: localStorage.getItem("user_name"),
   email: localStorage.getItem("email"),
  };
 }
 login() {
  this.setState({ login: true });
  
   Spotify.fetchToken().then(() => {
    Spotify.fetchUser().then(() => {
     this.setState({
      displayName: localStorage.getItem("user_name"),
      email: localStorage.getItem("email"),
     });
    });
   })
      .catch((error) => {console.log(error)});
};
 logout() {
      this.setState({ login: false});
      localStorage.clear();
      window.location.reload();
 }

 render() {
  if (this.state.login) {
   return (
    <div>
     <section id="profile">
      <h2>
       <span id="displayName">Welcome {this.state.displayName}</span>
      </h2>
      <br />
      <br />
      {/* <img id="avatar" src="" alt="Profile Avatar" /> */}
      <span id="avatar"></span>
      <ul>
       <li>
        <span id="email">{this.state.email}</span>
       </li>
      </ul>
      <button className="logout" onClick={this.logout.bind(this)}>Logout</button>
     </section>
    </div>
   );
  } else {
      return (
            <div>
                  <button className="login" onClick={this.login.bind(this)}>Get profile</button>
            </div>
      )
  }
 }
}

export default Profile;
