
import './SearchBar.css';
import icon from './logo.svg';

function SearchBar() {
    return(
        <form className='container'>
            <input className='search' 
            type='text'
            placeholder='Search town or city'>   
            </input>
            <button className='searchButton'>
                <img src={icon} alt='icon' />
            </button>
        </form>
    );
    

}

export default SearchBar;