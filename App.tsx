
import React, { useState, useCallback } from 'react';
import { Airport, WeatherForecast, MapInfo } from './types';
import { getMapInfo, getWeatherForecast, getTravelTip } from './services/geminiService';
import AirportSelector from './components/AirportSelector';
import WeatherDisplay from './components/WeatherDisplay';
import { Compass, Globe, MapPin, Search } from 'lucide-react';

const App: React.FC = () => {
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [mapInfo, setMapInfo] = useState<MapInfo | null>(null);
  const [travelTip, setTravelTip] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMapLoading, setIsMapLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number; } | null>(null);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Error getting location: ", err);
        setError("Impossible de récupérer votre position. Les fonctionnalités de la carte pourraient être moins précises.");
      }
    );
  };

  const handleAirportSelect = useCallback(async (airport: Airport) => {
    setSelectedAirport(airport);
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    setMapInfo(null);
    setTravelTip(null);

    try {
      const forecast = await getWeatherForecast(airport);
      setWeatherData(forecast);

      if (forecast && forecast.days.length > 0 && forecast.days[0].hourly.length > 0) {
        const tip = await getTravelTip(forecast.days[0].hourly[0].condition, airport.city);
        setTravelTip(tip);
      }
    } catch (err) {
      console.error(err);
      setError('Échec de la récupération des prévisions météo. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleShowMap = useCallback(async () => {
    if (!selectedAirport) return;
    setIsMapLoading(true);
    setError(null);

    if (!userLocation) {
        requestLocation();
    }

    try {
      const info = await getMapInfo(selectedAirport, userLocation);
      setMapInfo(info);
    } catch (err) {
      console.error(err);
      setError('Échec de la récupération des informations de la carte.');
    } finally {
      setIsMapLoading(false);
    }
  }, [selectedAirport, userLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4">
             <Compass size={48} className="text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              1Xmétéo
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400">Votre guide météo mondial des aéroports, propulsé par l'IA</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AirportSelector onAirportSelect={handleAirportSelect} />
          </div>
          <div className="lg:col-span-2">
            <WeatherDisplay
              airport={selectedAirport}
              weatherData={weatherData}
              mapInfo={mapInfo}
              travelTip={travelTip}
              isLoading={isLoading}
              isMapLoading={isMapLoading}
              error={error}
              onShowMap={handleShowMap}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>Propulsé par Sultan</p>
      </footer>
    </div>
  );
};

export default App;