
export interface Airport {
  name: string;
  iata: string;
  city: string;
  country: string;
}

export interface AirportRegion {
  region: string;
  airports: Airport[];
}

export interface AirportContinent {
  continent: string;
  regions: AirportRegion[];
}

export interface HourlyForecast {
  time: string; // "00:00", "06:00", "12:00", "18:00"
  temp_c: number;
  temp_f: number;
  condition: string;
  wind_kph: number;
  humidity: number;
  probability: number; // Le pourcentage de chance que cette condition se produise.
}

export interface DayForecast {
  day: string;
  date: string;
  hourly: HourlyForecast[];
}


export interface WeatherForecast {
  airport: string;
  city: string;
  days: DayForecast[];
  thirdDaySummary?: string; // Un résumé spécifique pour le troisième jour.
}

export interface MapPlace {
    title: string;
    uri: string;
}

export interface MapInfo {
    mapUri: string;
    mapTitle: string;
    nearbyPlaces: MapPlace[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets: {
        uri: string;
        title: string;
      }[];
    }[];
  };
}