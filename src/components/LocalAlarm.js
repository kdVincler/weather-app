import React, { useEffect, useState } from "react";
import './LocalAlarm.css';

function isExtremeWeather(id) {
    if (200 <= id && id <= 299)
        return true;
    if (id == 621 || id == 622)
        return true;
    if (762 <= id && id <= 781)
        return true;
    return false;
}

const Safe =
    <div>
        You are safe!
    </div>;

const Dangerous = (data) => 
    <div>
        Watch out!!!
    </div>;

const LocalAlarm = ({globalWeatherData}) => {
    if (globalWeatherData == null)
        return <div className="local-alarm">Pending...</div>;

    const extremeWeathers = globalWeatherData.weather.filter(w => isExtremeWeather(w.id));

    return (
        <div className="local-alarm">
            {extremeWeathers.length > 0 ? Dangerous(extremeWeathers) : Safe}
        </div>
    );
}

export default LocalAlarm;
