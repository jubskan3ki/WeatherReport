import { useState } from 'react';
import CitySelector, { City } from './Components/CitySelector/CitySelector';
import Weather from './Components/Weather/Weather';
import './App.css';

function App() {
    const defaultCity: City = {
        id: 3038789,
        nm: 'Abbeville',
        lat: 50.099998,
        lon: 1.83333
    };

    const [city, setCity] = useState<City | null>(defaultCity);

    return (
        <div className="App">
            <div className='WeatherReport'>
                <CitySelector onCitySelect={setCity} defaultCity={defaultCity} />
                {city && <Weather lat={city.lat} lon={city.lon}/>}
            </div>
        </div>
    );
}

export default App;