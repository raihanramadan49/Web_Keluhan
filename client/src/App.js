import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [keluhanSender, setKeluhanSender] = useState("");
  const [keluhanTopic, setKeluhanTopic] = useState("");
  const [keluhanIsi, setKeluhanIsi] = useState("");
  const [newKeluhanSender, setNewKeluhanSender] = useState("");

  const [keluhanList, setKeluhanList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setKeluhanList(response.data);
    });
  }, []);

  const submitForm = () => {
    Axios.post("http://localhost:3001/insert", {
      keluhanSender: keluhanSender,
      keluhanTopic: keluhanTopic,
      keluhanIsi: keluhanIsi,
    });
  };

  const updateForm = (e, id) => {
    e.preventDefault();
    Axios.put(`http://localhost:3001/update/${id}`, {
      newKeluhanSender: newKeluhanSender,
    });
  };

  const deleteForm = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>Aplikasi Web Pelaporan</h1>
      <label>Nama Pelapor</label>
      <input
        type="text"
        onChange={(event) => {
          setKeluhanSender(event.target.value);
        }}
      />
      <label>Topik Laporan</label>
      <input
        type="text"
        onChange={(event) => {
          setKeluhanTopic(event.target.value);
        }}
      />
      <label>Isi Laporan</label>
      <textarea
        type="text"
        onChange={(event) => {
          setKeluhanIsi(event.target.value);
        }}
      />
      <button onClick={submitForm}>Submit Laporan</button>

      <h1>List Keluhan</h1>

      {keluhanList.map((val, key) => {
        return (
          <div key={key} className="keluhan">
            <h1> {val.keluhanSender} </h1>
            <h1> {val.keluhanTopic} </h1>
            <h1> {val.keluhanIsi} </h1>
            <input
              type="text"
              placeholder="edit sender"
              onChange={(event) => {
                setNewKeluhanSender(event.target.value);
              }}
            />
            <button onClick={(e) => updateForm(e, val._id)}>Update</button>
            <button onClick={() => deleteForm(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
