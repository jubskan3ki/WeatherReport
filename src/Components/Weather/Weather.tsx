import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureQuarter, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';

interface WeatherProps {
    lat: number; // Latitude de la ville
    lon: number; // Longitude de la ville
}

interface WeatherData {
    main: {
        temp: number; // Température en degrés Celsius
        humidity: number; // Humidité en pourcentage
    };
    wind: {
        speed: number; // Vitesse du vent en m/s
    };
    weather: {
        icon: string; // Code de l'icône météo
    }[];
}

interface ForecastData {
    list: {
        dt: number; // Timestamp de la prévision
        main: {
            temp_min: number; // Température minimale en degrés Celsius
            temp_max: number; // Température maximale en degrés Celsius
        };
        weather: {
            icon: string; // Code de l'icône météo
        }[];
    }[];
}

const Weather: React.FC<WeatherProps> = ({ lat, lon }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null); // État local pour stocker les données météo actuelles
    const [forecast, setForecast] = useState<ForecastData | null>(null); // État local pour stocker les prévisions météo
    const [loading, setLoading] = useState<boolean>(true); // État local pour afficher le chargement

    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = '0733dbe3dec34345e775d93aabe936f4'; // Clé d'API OpenWeatherMap

            try {
                setLoading(true); // Afficher le chargement

                const weatherResponse = axios
                    .get<WeatherData>(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                    )
                    .then(response => {
                        setWeather(response.data); // Mise à jour de l'état avec les données météo actuelles
                    })
                    .catch(error => {
                        console.error('Error retrieving weather data', error);
                    });

                const forecastResponse = axios
                    .get<ForecastData>(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                    )
                    .then(response => {
                        setForecast(response.data); // Mise à jour de l'état avec les prévisions météo
                    })
                    .catch(error => {
                        console.error('Error retrieving forecast data', error);
                    });

                await Promise.all([weatherResponse, forecastResponse]);

                setLoading(false); // Masquer le chargement
            } catch (error) {
                console.error('Error in fetchWeather function', error);
                setLoading(false); // Masquer le chargement en cas d'erreur
            }
        };

        void fetchWeather();
    }, [lat, lon]);

    const getIconUrl = (icon: string) => {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`; // URL de l'icône météo basé sur le code
    };

    return (
        <div className="WeatherContent">
            {loading ? ( // Afficher le chargement si en cours
                <div className="loader_all">
                    <div className="loader">
                        <div className="box box0">
                            <div></div>
                        </div>
                        <div className="box box1">
                            <div></div>
                        </div>
                        <div className="box box2">
                            <div></div>
                        </div>
                        <div className="box box3">
                            <div></div>
                        </div>
                        <div className="box box4">
                            <div></div>
                        </div>
                        <div className="box box5">
                            <div></div>
                        </div>
                        <div className="box box6">
                            <div></div>
                        </div>
                        <div className="box box7">
                            <div></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {weather && (
                        <div className="weather">
                            <img src={getIconUrl(weather.weather[0].icon)} alt="Weather Icon" />
                            <div className="weatherStat">
                                <div className="weatherDiv">
                                    <FontAwesomeIcon icon={faTemperatureQuarter} />
                                    <p>{weather.main.temp}°C</p>
                                </div>
                                <div className="weatherDiv">
                                    <FontAwesomeIcon icon={faDroplet} />
                                    <p>{weather.main.humidity}</p>
                                </div>
                                <div className="weatherDiv">
                                    <FontAwesomeIcon icon={faWind} />
                                    <p>{weather.wind.speed}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {forecast && (
                        <div className="forecast">
                            {forecast.list
                                .filter((_, index) => [8, 16, 24].includes(index)) // Filtrage des prévisions pour n'afficher que celles avec les index 8, 16 et 24
                                .map((item, index) => (
                                    <div key={index}>
                                        <p className="forecastDate">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                                        <img src={getIconUrl(item.weather[0].icon)} alt="Weather Icon" />
                                        <p>
                                            <FontAwesomeIcon icon={faTemperatureQuarter} /> Min: {item.main.temp_min}°C
                                        </p>
                                        <p>
                                            <FontAwesomeIcon icon={faTemperatureQuarter} /> Max: {item.main.temp_max}°C
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Weather;
