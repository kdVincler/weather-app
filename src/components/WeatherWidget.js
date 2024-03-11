
import './WeatherWidget.css';
import SearchBar from './SearchBar';
import Results from './Results';
import React, { useState } from 'react';


const WeatherWidget = ({setGlobalCity}) => {
    const [city, setCity] = useState('');

    const handleCitySubmit = (newCity) => {
        setCity(newCity);
    };

    return(
        <div className='container'>
            <div className='back'>
                <SearchBar onCitySubmit={handleCitySubmit}/>
                <Results city={city} setGlobalCity={setGlobalCity}/>
            </div>

        </div>
    );
}

export default WeatherWidget;

