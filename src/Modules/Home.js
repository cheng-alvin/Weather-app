import Axios from "axios";
import { React, useState } from "react";
import "./Home.css";

let temperature;
let city;

const Home = () => {
  let [error, setErr] = useState("");
  let [hasEntered, setEntered] = useState(false);
  let [location, setLocation] = useState("");
  let [maxTemperature, setMaxTemperature] = useState();
  let [minTemperature, setMinTemperature] = useState();
  let [weather, setWeather] = useState();
  const CityChange = (e) => {
    city = e.target.value;
  };
  const Send = () => {
    Axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0fe58708e6d694a289790f09cf8e633`
    )
      .then((response) => {
        temperature = temperatureRounding(response.data.main.temp);
        setEntered((hasEntered = true));
        setLocation((location = response.data.name));
        setMaxTemperature(
          (maxTemperature = temperatureRounding(response.data.main.temp_max))
        );
        setMinTemperature(
          (minTemperature = temperatureRounding(response.data.main.temp_min))
        );
        setWeather((weather = response.data.weather[0].description));
      })
      .catch((err) => {
        console.log(err);
        setErr((error = "Sorry there was an error"));
        setTimeout(() => {
          setErr((error = " "));
        }, 5000);
      });
  };
  const backToHome = () => {
    setEntered((hasEntered = false));
  };
  const temperatureRounding = (temp) => {
    temp -= 273.15;
    temp = Math.round(temp);
    return temp;
  };

  if (hasEntered) {
    return (
      <div className="home">
        <div id="bar">
          <img
            onClick={backToHome}
            src="https://img.icons8.com/pastel-glyph/64/000000/circled-left.png"
          />
        </div>

        <h1 id="location">{location}</h1>
        <h1 id="temp">{`${temperature}C°`}</h1>
        <h2 id="max">{weather}</h2>
        <p id="max-min">{`${maxTemperature}C°|${minTemperature}C°`}</p>
      </div>
    );
  } else {
    return (
      <div className="home">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <h1>Weather App</h1>
        <h1 id="p">Please enter a city Below</h1>
        <p id="error">{error}</p>
        <input
          type="text"
          placeholder="Enter City..."
          id="enter_city"
          onChange={CityChange}
        ></input>
        <div className="btn">
          <button onClick={Send}>SEARCH</button>
        </div>
        <div id="placehoader"></div>
      </div>
    );
  }
};

export default Home;
