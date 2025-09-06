import Spotify from "../Utils/Spotify";
import React from "react";

class Login extends React.Component {
      // component that renders a login button to authorize the app with Spotify
      render() {
            return (
                  <div>
                        <button onClick={Spotify.requestAuthorization}>Log in to Spotify</button>
                  </div>
            )
      }
}

export default Login;