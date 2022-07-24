import React from 'react'

function WeatherItem(props) {
  const { data } = props;
  const ICON_URL =
    "http://openweathermap.org/img/wn/" + `${data.weather[0].icon}` + ".png";
  return (
    <div>
      <h2>
        {data.name}, {data.sys.country} | {new Date().toISOString().slice(0, 10)} | {Math.round(data.main.temp *10)/10} °C |<img src={ICON_URL} alt="" />
        {data.weather[0].description}
      </h2>
    </div>
  );
}

export default WeatherItem;