const path = require("path");
const express = require("express");
// const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const cors = require("cors");

const app = express();
// app.use(cors());
// app.options("*", cors());
const port = process.env.PORT || 3001;
const corsOptions = {
  origin: "https://gabai-weather-app.herokuapp.com/",
  optionsSuccessStatus: 200,
};

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

app.get("/api/weather", cors(corsOptions), (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (errorForecast, forecastData) => {
        if (errorForecast) {
          return res.send({ errorForecast });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
