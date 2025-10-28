
import React from 'react';
import { Airport, WeatherForecast, MapInfo } from '../types';
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, MapPin, Lightbulb, ExternalLink, Clock } from 'lucide-react';

interface WeatherDisplayProps {
  airport: Airport | null;
  weatherData: WeatherForecast | null;
  mapInfo: MapInfo | null;
  travelTip: string | null;
  isLoading: boolean;
  isMapLoading: boolean;
  error: string | null;
  onShowMap: () => void;
}

const WeatherIcon: React.FC<{ condition: string; size?: number }> = ({ condition, size=32 }) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('soleil') || lowerCondition.includes('clair')) {
    return <Sun size={size} className="text-yellow-400" />;
  }
  if (lowerCondition.includes('pluie') || lowerCondition.includes('averse')) {
    return <CloudRain size={size} className="text-blue-400" />;
  }
  if (lowerCondition.includes('nuage') || lowerCondition.includes('couvert')) {
    return <Cloud size={size} className="text-gray-400" />;
  }
  return <Cloud size={size} className="text-gray-400" />;
};

const Loader: React.FC<{ text?: string }> = ({ text = "Récupération des prévisions IA..."}) => (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-800/50 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-lg text-gray-300">{text}</p>
    </div>
);

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  airport, weatherData, mapInfo, travelTip, isLoading, isMapLoading, error, onShowMap
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-8 text-center bg-red-900/50 border border-red-700 rounded-lg">
        <h3 className="text-xl font-semibold text-red-300">Une erreur est survenue</h3>
        <p className="text-red-400 mt-2">{error}</p>
    </div>;
  }

  if (!airport || !weatherData) {
    return (
      <div className="p-8 text-center bg-gray-800/50 border border-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-300">Bienvenue sur 1Xmétéo</h3>
        <p className="text-gray-400 mt-2">Veuillez sélectionner un aéroport pour voir ses prévisions sur 3 jours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold text-white">{airport.name} ({airport.iata})</h2>
            <p className="text-lg text-gray-400">{airport.city}, {airport.country}</p>

            {travelTip && (
                <div className="mt-4 p-3 bg-cyan-900/50 border border-cyan-700 rounded-lg flex items-center gap-3">
                <Lightbulb className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                <p className="text-cyan-300 text-sm">{travelTip}</p>
                </div>
            )}
        </div>
        
        <div className="space-y-4">
            {weatherData.days.map((day, index) => {
                const isThirdDay = index === 2;
                const dayCardClasses = isThirdDay
                    ? "bg-gradient-to-br from-gray-800/60 to-cyan-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border-2 border-cyan-500 shadow-2xl ring-1 ring-cyan-400/50 transition-all duration-300 transform lg:scale-105"
                    : "bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-700 shadow-lg transition-all duration-300";

                return (
                <div key={index} className={dayCardClasses}>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-xl text-white flex items-center gap-3 capitalize">
                            {day.day}
                            {isThirdDay && (
                                <span className="text-xs bg-cyan-400 text-gray-900 font-bold px-2 py-1 rounded-full animate-pulse">
                                    JOUR CLÉ
                                </span>
                            )}
                        </h4>
                        <p className="text-md text-gray-400">{day.date}</p>
                    </div>
                     {isThirdDay && weatherData.thirdDaySummary && (
                        <div className="mb-4 p-3 bg-cyan-900/50 border border-cyan-800 rounded-lg flex items-center gap-3">
                            <Lightbulb className="text-cyan-300 w-5 h-5 flex-shrink-0" />
                            <p className="text-cyan-200 text-sm font-medium">{weatherData.thirdDaySummary}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {day.hourly.map((hour, hourIndex) => (
                            <div key={hourIndex} className="bg-gray-900/60 p-3 rounded-lg border border-gray-700 flex flex-col items-center">
                                <p className="font-semibold text-lg text-cyan-300 flex items-center gap-1"><Clock size={14}/>{hour.time}</p>
                                <div className="my-2">
                                    <WeatherIcon condition={hour.condition} />
                                </div>
                                <div className="text-center mb-2 h-10"> {/* Fixed height to prevent layout shift */}
                                    <p className="text-sm text-gray-400 capitalize">{hour.condition}</p>
                                    {typeof hour.probability === 'number' && (
                                        <p className="text-xs text-cyan-400/90 font-semibold">{hour.probability}% de chance</p>
                                    )}
                                </div>
                                <div className="text-lg font-bold">
                                    <p>{hour.temp_c}°C / {hour.temp_f}°F</p>
                                </div>
                                <div className="mt-3 space-y-1 text-xs text-gray-300 w-full">
                                    <p className="flex items-center justify-center gap-1"><Wind size={12} className="text-gray-400"/> {hour.wind_kph} kph</p>
                                    <p className="flex items-center justify-center gap-1"><Droplets size={12} className="text-blue-300"/> {hour.humidity}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                );
            })}
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Lieu et Alentours</h3>
            { !mapInfo && (
                 <button onClick={onShowMap} disabled={isMapLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <MapPin size={20}/>
                    {isMapLoading ? 'Chargement de la carte...' : 'Afficher sur la carte et trouver à proximité'}
                </button>
            )}
           
            { isMapLoading && !mapInfo && <Loader text="Recherche de l'emplacement..."/>}

            {mapInfo && (
                <div className="space-y-4">
                    <a href={mapInfo.mapUri} target="_blank" rel="noopener noreferrer" className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <MapPin size={20}/> Ouvrir la carte pour {mapInfo.mapTitle} <ExternalLink size={16} className="ml-1"/>
                    </a>
                    {mapInfo.nearbyPlaces.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-300 mb-2">Lieux d'intérêt à proximité :</h4>
                            <ul className="space-y-2">
                                {mapInfo.nearbyPlaces.map((place, i) => (
                                    <li key={i}>
                                        <a href={place.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                                            <ExternalLink size={16} className="text-cyan-400"/>
                                            <span className="text-gray-300">{place.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default WeatherDisplay;