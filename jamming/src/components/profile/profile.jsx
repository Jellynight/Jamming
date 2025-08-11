import React from 'react';

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
render() {
      return(
      <div>
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
