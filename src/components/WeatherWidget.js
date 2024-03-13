import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import '../css/WeatherWidget.css';


const WeatherWidget = ({setGlobalCity, setGlobalWeatherData}) => {
    const [city, setCity] = useState('');

    const handleCitySubmit = (newCity) => {
        setCity(newCity);
    };

    return(
        <div className='container'>
            <div className='back'>
                <SearchBar onCitySubmit={handleCitySubmit}/>
                <Results city={city} setGlobalCity={setGlobalCity} setGlobalWeatherData={setGlobalWeatherData}/>
            </div>

        </div>
    );
}

export default WeatherWidget;

