import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Hero from '../Hero/Hero'
import WetherItem from "./WetherItem";

const Header = () => {
  const API_KEY = "96849fb0b19d41d96eede86cac41d091";

  const [form, setForm] = useState({
    city: ""
  })
  const [weather, setWeather] = useState([])
  async function weatherData(e) {
    e.preventDefault()
    if (form.city === "") {
      alert("Add value")
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&units=metric&APPID=${API_KEY}`
      )
        .then(res => res.json())
        .then((data) => data)
      setWeather({
          data: data
        })
    }
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'city') {
      setForm({...form, city: value})
    }
    // console.log(form.city);
  }
  return (
    <div>
      <form>
        <h1>Weather App</h1>
        <input
          type="text"
          name="city"
          placeholder="Enter the city..."
          onChange={(e) => handleChange(e)}
          className={styles.input__header}
        />
        <button
          className={styles.button}
          onClick={(e) => weatherData(e)}>Submit</button>
      </form>
      {weather.data !== undefined ? (
        <div>
          <WetherItem data={weather.data} />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
