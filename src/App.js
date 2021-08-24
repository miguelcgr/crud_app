import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';

function App() {

  const [adTitle, setAdTitle] = useState("");
  const [adText, setAdText] = useState("");
  console.log('adtitle', adTitle)
  console.log('adtext', adText)

  const submitAdText = () => {

  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Title</label>
        <input type="text" name="Title" onChange ={(e) => {setAdTitle(e.target.value)}}></input>
        <label>Text</label>
        <input type="text" name="Text" onChange ={(e) => {submitAdText(e.target.value)}}></input>
        <button>Post</button>
      </div>
    </div>
  );
}

export default App;
