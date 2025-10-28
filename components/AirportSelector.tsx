
import React, { useState } from 'react';
import { Airport } from '../types';
import { AIRPORT_DATA } from '../constants';
import { ChevronDown, Globe, Map } from 'lucide-react';

interface AirportSelectorProps {
  onAirportSelect: (airport: Airport) => void;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({ onAirportSelect }) => {
  const [selectedContinent, setSelectedContinent] = useState<string>(AIRPORT_DATA[0].continent);
  const [selectedRegion, setSelectedRegion] = useState<string>(AIRPORT_DATA[0].regions[0].region);

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newContinent = e.target.value;
    setSelectedContinent(newContinent);
    const continentData = AIRPORT_DATA.find(c => c.continent === newContinent);
    if (continentData && continentData.regions.length > 0) {
      setSelectedRegion(continentData.regions[0].region);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const currentContinent = AIRPORT_DATA.find(c => c.continent === selectedContinent);
  const currentRegion = currentContinent?.regions.find(r => r.region === selectedRegion);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Sélectionner un aéroport</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="continent" className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><Globe size={16}/>Continent</label>
          <div className="relative">
            <select
              id="continent"
              value={selectedContinent}
              onChange={handleContinentChange}
              className="w-full bg-gray-900/70 border border-gray-600 rounded-md p-2 appearance-none focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              {AIRPORT_DATA.map(continent => (
                <option key={continent.continent} value={continent.continent}>
                  {continent.continent}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2"><Map size={16} />Région / Pays</label>
           <div className="relative">
            <select
              id="region"
              value={selectedRegion}
              onChange={handleRegionChange}
              className="w-full bg-gray-900/70 border border-gray-600 rounded-md p-2 appearance-none focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              {currentContinent?.regions.map(region => (
                <option key={region.region} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-2 mt-4">Aéroports</h3>
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {currentRegion?.airports.map(airport => (
              <li key={airport.iata}>
                <button
                  onClick={() => onAirportSelect(airport)}
                  className="w-full text-left p-3 bg-gray-700/50 hover:bg-cyan-500/20 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <p className="font-semibold">{airport.name}</p>
                  <p className="text-sm text-gray-400">{airport.city}, {airport.iata}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AirportSelector;