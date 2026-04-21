# 🎵 MySpotify web application 🎵
<br></br>
## 🔖 This web app needs Spotify Premium account
### This app is free for anyone to cloan, build upon and use as they wish!
<br></br>
## 🤫 Client Secret
The client secret was not included in this repository. You can create your own client secret by creating a Spotify account and adding the application to it and get your own client secret to use.  
<br></br>
## ❓ About ❓
This web app is setup using 🔗[Create React App](https://github.com/facebook/create-react-app) and uses react claas components. It was a project through the Full Stack Developer certification from Learning People. This project taught me about creating API requests and handling the response. Built using React router and functional components. Testing was done with DevTools and AI. 
<br></br>
## 😕 OAuth code flow
For the app to work I had to use authorization code flow with PKCE. The flow starts with the creating of a code verifier/random string generator then hash the string using the SHA256 algorithm. Next I implement a function base64encode that returns the base64 representation of the digest we just calculated with the SHA256 function. Then I request authorization ("GET") with the client id, response type, code challenge method, calculated code challenge, redirect URI, state, headers set. The response I get back is a authorization code I now use to make another request ("POST") for an access token that is done after the redirect in the callback function. The callback function handles the token request after the redirect then uses the accsess token from the response to grab user information and handle future API requests. Now the user is authenticated you can search songs, edit and create playlists.        
<br></br>
## 🧱 Dependencies Used:
- React
- React-Redux
<br></br>
## Testing Tools
- DevTools with react/redux extentions
- AI CoPilot
- Git AI
