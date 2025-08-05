/** @format */

import React, { useEffect } from "react";
import "./searchbar.css";
import { useDispatch } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "../Utils/CreateSlice";
import { fetchWebApi } from "../Utils/SpotifyApi";

const SearchBar = () => {
      const dispatch = useDispatch();

      useEffect(() => {
       const handleSearch = () => {
        const query = document.querySelector(".SearchBar input").value;
        dispatch(setSearchTerm(query));
        dispatch(fetchWebApi(selectSearchTerm))
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
