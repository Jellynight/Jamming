/** @format */

import React from "react";
import "./track.css";

class Track extends React.Component {
 render() {
  const { track } = this.props;
  return (
   <div className="Track">
    <div className="Track-information">
     <h3>{track.name}</h3>
     <p>
      {track.artist} | {track.album}
     </p>
    </div>
    <button className="Track-action">+</button>
    <button className="Track-action">-</button>
   </div>
  );
 }
}

export default Track;
