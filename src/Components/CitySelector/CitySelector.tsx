import React, { useEffect, useState } from 'react';
import citiesData from '../../Data/cities-fr.json'; // Importation des données des villes françaises
import './CitySelector.css';

export interface City {
	id: number;
	nm: string; // Nom de la ville
	lat: number; // Latitude de la ville
	lon: number; // Longitude de la ville
}

type CitySelectorProps = {
	onCitySelect: (city: City) => void; // Fonction de rappel pour sélectionner une ville
	defaultCity: City; // Ville par défaut sélectionnée
};

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect, defaultCity }) => {
	const [cities, setCities] = useState<City[]>([]); // État local pour stocker les villes

	useEffect(() => {
		setCities(citiesData); // Initialisation des villes avec les données importées
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCity = cities.find(city => city.nm === event.target.value); // Récupération de la ville sélectionnée
		if (selectedCity) {
			onCitySelect(selectedCity); // Appel de la fonction de rappel pour sélectionner la ville
		}
	};

	return (
		<select className='SelectCity' onChange={handleChange} defaultValue={defaultCity.nm}>
			{cities.map((city, index) => (
				<option key={index} value={city.nm}>
					{city.nm} {/* Affichage du nom de la ville dans l'option du menu déroulant */}
				</option>
			))}
		</select>
	);
};

export default CitySelector;