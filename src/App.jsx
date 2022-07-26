import React, { useState } from "react";
import styles from "./styles/App.module.css"


const WeatherContext = React.createContext({
  cities: [],
  addCity: (name, temperature, country, description, icon) => {},
});

function App() {
  const [cities, setCities] = React.useState([]);
  const addCity = (name, temperature, country, description, icon) => {
    const newCity = { name, temperature, country, description, icon };
    setCities((prevCities) => [
      ...prevCities,
      { name, temperature, country, description, icon },
    ]);
  };
  return (
    <WeatherContext.Provider
      value={{
        cities,
        addCity,
      }}>
      <div className={styles.app}>
        <h1>Weather App</h1>
        <Input />
        <CityList />
      </div>
    </WeatherContext.Provider>
  );
}

const CityList = () => {
  const context = React.useContext(WeatherContext);
  return (
    <ul className={styles.list}>
      {context.cities.map((city, id) => (
        <li key={id} className={styles.list__item}>
          {city.name.charAt(0).toUpperCase() + city.name.slice(1)},{" "}
          {city.country} | {Math.round(city.temperature * 10) / 10}
          °C | {new Date().toISOString().slice(0, 10)} |
          <img
            src={"http://openweathermap.org/img/wn/" + `${city.icon}` + ".png"}
            alt=""
            className={styles.list__icon}
          />
          {city.description}
        </li>
      ))}
    </ul>
  );
};

const Input = () => {
  const context = React.useContext(WeatherContext);
  const [name, setName] = React.useState("");
  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      const locationName = encodeURIComponent(name);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&APPID=96849fb0b19d41d96eede86cac41d091`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            if (response.status === 404) {
              return alert("Wrong location");
            }
            alert("Error");
          }
        })
        .then((data) => {
          context.addCity(
            name,
            data.main.temp,
            data.sys.country,
            data.weather[0].description,
            data.weather[0].icon
          );
          setName("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.app_input}
        type="text"
        value={name}
        placeholder="Enter the city..."
        onChange={(e) => setName(e.target.value)}
        onKeyPress={onSubmit}
      />
      <button className={styles.button} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default App;
