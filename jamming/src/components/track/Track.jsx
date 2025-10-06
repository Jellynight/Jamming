/** @format */

import React from "react";
import "./track.css";

class Track extends React.Component {
 constructor(props) {
  super(props);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
 }
 addTrack() {
  // This method will call the onAdd prop passed down from the TrackList component
  this.props.onAdd(this.props.id);
 }
 removeTrack() {
  // This method will call the onRemove prop passed down from the TrackList component
  this.props.onRemove(this.props.id);
 }
 renderAction() {
  // This method will return either a "+" or "-" depending on the isRemoval prop
  if (this.props.isRemoval) {
   return (
    <button className="Track-action" onClick={this.removeTrack}>
     "-"
    </button>
   );
  } else {
   return (
    <button className="Track-action" onClick={this.addTrack}>
     "+"
    </button>
   );
  }
 }

 render() {
  
  return (
   <div className="Track">
    <div className="Track-information">
     <h3>{ this.props.name }</h3>
     <p>
      {this.props.artist} | {this.props.album}
     </p>
    {this.renderAction()}
   </div>
   </div>
  );
 }
}

export default Track;
