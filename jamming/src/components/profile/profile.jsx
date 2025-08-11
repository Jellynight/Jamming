import React from 'react';
import Spotify from '../Utils/Spotify.js';

class Profile extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
            displayName: '',
            id: '',
            email: '',
            uri: '',
            url: '',
            imgUrl: ''
            };
            }
getUserProfile = async () => {
      try {
            const profile = await Spotify.getUserProfile();
            this.setState({
                  displayName: profile.display_name,
                  id: profile.id,
                  email: profile.email,
                  uri: profile.uri,
                  url: profile.external_urls.spotify,
                  imgUrl: profile.images[0].url
            });
      } catch (error) {
            console.error("Error fetching user profile:", error);
      }
}

componentDidMount() {
            this.getUserProfile();
      }
render() {
      return(
      <div>
      <button onClick={this.getUserProfile}>Refresh Profile</button>
      <h1>Display your Spotify profile data</h1>
      <section id="profile">
      <h2>Logged in as <span id="displayName">{this.state.displayName}</span></h2>
      <span id="avatar"><img src={this.state.imgUrl} alt="Avatar" /></span>
      <ul>
      <li>User ID: <span id="id">{this.state.id}</span></li>
      <li>Email: <span id="email">{this.state.email}</span></li>
      <li>Spotify URI: <a id="uri" href={this.state.uri}>{this.state.uri}</a></li>
      <li>Link: <a id="url" href={this.state.url}>{this.state.url}</a></li>
      <li>Profile Image: <span id="imgUrl">{this.state.imgUrl}</span></li>
      </ul>
      </section>
      </div>
      )
}};

export default Profile;
