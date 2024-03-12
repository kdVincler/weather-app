import React, {useEffect, useState} from "react";
import axios from "axios";
import wIcon from './wIcon.svg';
import thermometer from './thermometer.svg';
import './Results.css';
import humidity from './humidity.svg';
import sunrise from './sunrise.svg';
import sunset from './sunset.svg';
import pressure from './pressure.svg';
import wind from './wind.svg';

const Results = ({city, setGlobalCity, setGlobalWeatherData}) => {
    const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=13f35ad8d3b3a5c1d90cbb7e1977e2cf`
            );
            setWeatherData(response.data);
            setGlobalWeatherData(response.data);
            setGlobalCity(response.data.name);
        }
        catch (error){
            console.error(error);
            setWeatherData(null);
            alert("invalid town or city");
        }
    }

    useEffect(() => {
        if (city){
            fetchData();
        }
    }, [city]);

    const convertTimeStampToDate = (timestamp, timezone) => {
        const dateObject = new Date(timestamp * 1000)
        const timeObject = timezone / 60;

        dateObject.setMinutes(dateObject.getMinutes() + timeObject);

        return dateObject.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: false});
    };

    const degreeToCompass = (deg) => {
        const compass = ['North','North East','East','South East','South','South West','West','North West'];
        const index = Math.round(deg / 45) % 8;
        return compass[index];
    };

    const splitWords = (description) => {
        const arr = description.split(" ");
        return arr

    };

    
    return (
        <div className='results'>
            {weatherData ? (
                <section >
                    <div className="resultsHeader">
                        <h1 className="Rname">{weatherData.name}</h1>
                        <div className="sun_div">
                            <div className="sun">
                                <img src={sunrise} className="sun_icon" alt="sunrise"></img>
                                <p className="sun_text">{convertTimeStampToDate(weatherData.sys.sunrise, weatherData.timezone)}</p>
                            </div>
                            <div className="sun">
                                <img src={sunset} className="sun_icon" alt="sunset"></img>
                                <p className="sun_text">{convertTimeStampToDate(weatherData.sys.sunset, weatherData.timezone)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="data">
                        <div className="card"> 
                            <p className="card_title">Temperature</p>
                            <img src={thermometer} alt="temperature" className='thermometer'></img>
                            <p className="temp_text">{weatherData.main.temp}&deg;C</p>
                        </div>
                        <div className="card"> 
                            <p className="card_title">Description</p>
                            <img alt="description" src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} className='desc_icon'></img>
                            <p className="desc_text" >{splitWords(weatherData.weather[0].description)[0]} <br/>{splitWords(weatherData.weather[0].description)[1]} </p>
                        </div>
                        <div className="card"> 
                            <p className="card_title">Humidity</p>
                            <img src={humidity} className='humidity' alt="humidity"></img>
                            <p className="temp_text">{weatherData.main.humidity}%</p>
                        </div>
                        <div className="card"> 
                            <p className="card_title">Pressure</p>
                            <img src={pressure} className='pressure' alt="pressure"></img>
                            <p className="temp_text">{weatherData.main.pressure} mb</p>
                        </div>
                        <div className="card"> 
                            <p className="card_title">Wind</p>
                            <img src={wind} className='wind' alt="wind"></img>
                            <p className="wind_div">{weatherData.wind.speed} m/s<br/> {degreeToCompass(weatherData.wind.deg)} </p>
                        </div>
                    </div>

                </section>
            ) : (
                <section>
                    <img src={wIcon} className='wIcon' alt="loading"></img>
                </section>

            )
            }
        </div>
    );

    
};
    
    
export default Results;

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