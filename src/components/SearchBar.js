
import React, {useState} from "react";
import '../css/SearchBar.css';
import icon from '../images/logo.svg';



function SearchBar({onCitySubmit}) {
    const [city, setCity] = useState('');

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCitySubmit(city);
        
    }
    return(
        <form className='container' onSubmit={handleSubmit}>
            <input className='search' 
            type='text'
            placeholder='Search town or city'
            value={city}
            onChange={handleInputChange}
            />
            <button type="submit" className='searchButton'>
                <img src={icon} alt='search' />
            </button>
        </form>
    );
    

}

export default SearchBar;