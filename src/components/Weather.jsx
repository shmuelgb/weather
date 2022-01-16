import React from "react";

export default function Weather({ weatherData }) {
  return (
    <div>
      <h1>Weather in {weatherData.address}:</h1>
      <p>{weatherData.forecast}</p>
    </div>
  );
}
