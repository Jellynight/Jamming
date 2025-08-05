/** @format */

import React from "react";
import "./App.css";
import SearchBar from "../searchbar/Searchbar.jsx";
import SearchResults from "../searchResults/SearchResults.jsx";
import Playlist from "../playlist/PLaylist.jsx";
import "./App.css";


class App extends React.Component {
 render() {
  return (
   <div>
    <h1>
     Ja<span className="highlight">mmm</span>ing
    </h1>
    <div className="App">
     <SearchBar />
     <div className="App-playlist">
      <SearchResults />
      <Playlist />
     </div>
    </div>
   </div>
  );
 }
}

export default App;
