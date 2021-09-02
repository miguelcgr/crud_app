import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
require("dotenv").config();

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [adTitle, setAdTitle] = useState("");
  const [adText, setAdText] = useState("");
  const [adsList, setAdsList] = useState([]);

  const [newAdText, setNewAdText] = useState("");

  const postedBy = "someones name";

  useEffect(() => {
    axios.get(`${apiUrl}/api/get`).then((response) => {
      setAdsList(response.data);
    });
  }, []);

  const submitAdText = () => {
    axios
      .post(`${apiUrl}/api/insert`, {
        adTitle: adTitle,
        adText: adText,
        postedBy: postedBy,
      })
      .then(() => {
        alert("correctly inserted"); //setAdsList([...adsList, {adTitle: adTitle, adText: adText, postedBy: postedBy}])
      });
    setAdsList([
      ...adsList,
      { adTitle: adTitle, adText: adText, postedBy: postedBy },
    ]);
  };

  const deleteAd = (ad) => {
    console.log("ad", ad);

    axios
      .delete(`${apiUrl}/api/delete/${ad}`)
      .then(() => {
        alert("deleted");
      })
      .catch((err) => {
        console.log("error - DELETE - CLIENT", err);
      });
  };

  const updateAd = (ad) => {
    console.log("ad", ad);

    axios
      .put(`${apiUrl}/api/update`, {
        adTitle: ad,
        adText: newAdText,
      })
      .then(() => {
        alert("updated");
      })
      .catch((err) => {
        console.log("error - UPDATE - CLIENT", err);
      });
    setNewAdText("");
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Title</label>
        <input
          type="text"
          name="Title"
          onChange={(e) => {
            setAdTitle(e.target.value);
          }}
        ></input>
        <label>Text</label>
        <input
          type="text"
          name="Text"
          onChange={(e) => {
            setAdText(e.target.value);
          }}
        ></input>
        <button onClick={submitAdText}>Post</button>
        {adsList.map((value, i) => {
          return (
            <div className="card" key={i}>
              <h1>AD TITLE {value.adTitle}</h1>
              <h2>AD TEXT {value.adText}</h2>

              <button
                onClick={() => {
                  deleteAd(value.adTitle);
                }}
              >
                Delete
              </button>

              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewAdText(e.target.value);
                }}
              ></input>

              <button
                onClick={() => {
                  updateAd(value.adText);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
