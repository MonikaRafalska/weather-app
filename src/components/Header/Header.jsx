import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Hero from '../Hero/Hero'
import WeatherItem from "./WeatherItem";


const Header = () => {
  const API_KEY = "96849fb0b19d41d96eede86cac41d091";

  const [form, setForm] = useState([{
    city: ""
  }])
  const [weather, setWeather] = useState([])
  async function fetchWeather(e) {
    if (form.city === "") {
      alert("Invalid value, enter the city name");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&units=metric&APPID=${API_KEY}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            if (res.status === 404) {
              return alert("Wrong location")
            } alert("Error")
          }
        })
        .then((data) => data)
      setWeather({
        data: data,
      })
    }
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'city') {
      setForm({...form, city: value})
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    fetchWeather(e)
    form.reset();
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Weather App</h1>
        <input
          type="text"
          name="city"
          placeholder="Enter the city..."
          onChange={(e) => handleChange(e)}
          className={styles.input__header}
        />
        <button className={styles.button}
        >
          Submit
        </button>
      </form>
      {weather.data !== undefined ? (
        <div>
          <WeatherItem data={weather.data} />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
