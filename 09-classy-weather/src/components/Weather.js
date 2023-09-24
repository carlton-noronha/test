import React from "react";
import Day from "./Day";

class Weather extends React.Component {
  componentWillUnmount() {
    console.log("Weather component will un-mount");
  }

  render() {
    const {
      temperature_2m_max: maxTemperatures,
      temperature_2m_min: minTemperatures,
      time: dates,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, index) => (
            <Day
              key={date}
              date={date}
              maxTemperature={maxTemperatures.at(index)}
              minTemperature={minTemperatures.at(index)}
              code={codes.at(index)}
              isToday={index === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Weather;
