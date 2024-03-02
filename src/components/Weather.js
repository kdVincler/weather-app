import React, {useEffect, useState} from "react";
import axios from "axios";
import './Weather.css'
import pic from './searchButton.svg';

const Weather = ({setGlobalCity}) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=595632c8bd4a3cf35501af114cf99186`
            );
            {/* This is Konrad's API key, make sure to replace it with your own. */}
            setWeatherData(response.data);
            // console.log(response.data); // outputs weather data to console log
            setGlobalCity(response.data.name) // this makes it possible for the Activities component to output the same city's activities
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return(
        <div className="mainTile">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    className="inputField"
                    id="inputField"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit"><img src={pic} alt="search-button-icon"/> Search</button>
            </form>
            {weatherData ? (
                <section className="weatherData">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Feels like: {weatherData.main.feels_like}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Pressure: {weatherData.main.pressure}</p>
                    <p>Wind Speed: {weatherData.wind.speed}m/s</p>
                </section>
            ): (
                <section className="weatherData">
                    <p>Loading weather data...</p>
                </section>
            )}
        </div>
    );
};
export default Weather;

/*
Format of the JSON returned by the OpenWeather API:
{
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 5.9,
        "feels_like": 3.52,
        "temp_min": 4.44,
        "temp_max": 7.06,
        "pressure": 994,
        "humidity": 81
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.09,
        "deg": 170
    },
    "clouds": {
        "all": 75
    },
    "dt": 1709404066,
    "sys": {
        "type": 2,
        "id": 2075535,
        "country": "GB",
        "sunrise": 1709361782,
        "sunset": 1709401347
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
*/