import React, { useState } from "react";
import axios from "axios";
// import { BrowserRouter as router } from "react-router-dom";
import Weather from "./components/Weather";
import "./App.css";

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState();

  const getWeather = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/weather?address=${location}`
    );
    console.log(data);
    setWeather(data);
  };

  return (
    <div className="App">
      <h1>Welcome to weather app</h1>
      <h2>type your location:</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={getWeather}>Submit</button>
      {weather && <Weather weatherData={weather} />}
    </div>
  );
}
