// CRUD Tutorial Using MERN Stack - MongoDB, ReactJS, NodeJS [Part 2]
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [foodn, setFood] = useState("");
  const [days, setDays] = useState(0);
  const [foodlist, setfoodlist] = useState([]);
  const [newFoodname, setNewfood] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8005/restore").then((response) => {
      setfoodlist(response.data);
    });
  }, []);
  function Add() {
    axios.post(
      "http://localhost:8005/insert",
      {
        foodn: foodn,
        days: days,
      },
      reload()
    );
  }

  function updatefood(id) {
    axios.put("http://localhost:8005/update", {
      id: id,
      newFoodname: newFoodname,
    });
    reload()
  }
  function deleteFood(id) {
    axios.delete(`http://localhost:8005/delete/${id}`);
    reload();
  }
  function reload() {
    window.location.reload();
  }

  return (
    <>
      <div className="App">
        <h1>Store</h1>
        <label>Material Name: </label>
        <input type="text" onChange={(event) => setFood(event.target.value)} />
        <label>Amount</label>
        <input
          type="number"
          onChange={(event) => setDays(event.target.value)}
        />
        <br />

        <button onClick={() => Add()}>Add</button>

        <h1>Store List</h1>
        {foodlist.map((value, key) => {
          return (
            <div key={key} className="food">
              <h3>{value.foodName}</h3>
              <h3>{value.dayssinceIate}</h3>
              <input
                type="text"
                placeholder="update data here"
                onChange={(event) => setNewfood(event.target.value)}
              />
              <button onClick={() => updatefood(value._id)}>Update</button>
              <button onClick={() => deleteFood(value._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
// This One Line Of Code Catches React Bugs For You
