/** @format */

import React from "react";
import "./searchbar.css"; 

class SearchBar extends React.Component {
 constructor(props) {
  super(props);
   this.searchTerm = "";
   this.search = this.search.bind(this);
   this.handleTermChange = this.handleTermChange.bind(this);
 }
 search() {
  this.props.onSearch(this.searchTerm);
 }
 handleTermChange(event) {
      console.log(event.target.value);
      const term = event.target.value;
      this.searchTerm = term;
 }
 render() {
  return (
   <div className="SearchBar">
    <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
    <button className="SearchButton" onClick={this.search}>SEARCH</button>
   </div>
  );
 }
}

export default SearchBar;
