
import './WeatherWidget.css';
import SearchBar from './SearchBar';
import wIcon from './wIcon.svg';

function WeatherWidget() {
    return(
        <div className='container'>
            <div className='back'>
                <SearchBar />
                <div className='results'>
                    <img src={wIcon} className='wIcon'/>
                </div>
            </div>

        </div>
    );
}

export default WeatherWidget;

