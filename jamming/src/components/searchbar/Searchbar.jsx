/** @format */

import React, { useEffect } from "react";
import "./searchbar.css";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../Utils/CreateSlice";
import { fetchToken } from "../Utils/SpotifyApi";

const SearchBar = () => {
      const dispatch = useDispatch();
      // Fetch the token when the component mounts
      dispatch(fetchToken());

      useEffect(() => {
       const handleSearch = () => {
        const query = document.querySelector(".SearchBar input").value;
        dispatch(setSearchTerm(query));
       };
       
       document.querySelector(".SearchBar button").addEventListener("click", handleSearch);
      }, [dispatch]);

      
      return (
       <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <button className="SearchButton">SEARCH</button>
   </div>
  );
 }


export default SearchBar;
