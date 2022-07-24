import React from 'react'

function WetherItem(props) {
  const { data } = props;
  const ICON_URL =
    "http://openweathermap.org/img/wn/" + `${data.weather[0].icon}` + ".png";
  return (
    <div>
      <h2>
        {data.name}, {data.sys.country} | {new Date().toLocaleTimeString()} |{" "}
        {Math.round(data.main.temp)}°C | <img src={ICON_URL} alt="" />
        {data.weather[0].description}
      </h2>
    </div>
  );
}

export default WetherItem;