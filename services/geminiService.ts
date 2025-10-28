
import { GoogleGenAI } from "@google/genai";
import { Airport, WeatherForecast, MapInfo, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("La variable d'environnement API_KEY n'est pas définie");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWeatherForecast = async (airport: Airport): Promise<WeatherForecast> => {
    const weatherForecastInterfaceString = `
interface HourlyForecast {
  time: string; // "00:00", "06:00", "12:00", ou "18:00"
  temp_c: number;
  temp_f: number;
  condition: string; // ex: Ensoleillé, Nuageux, Pluie
  wind_kph: number;
  humidity: number;
  probability: number; // Le pourcentage de chance que cette condition se produise.
}

interface DayForecast {
  day: string; // Jour de la semaine en français (ex: "Lundi")
  date: string; // La date spécifique, formatée comme "26 Juil"
  hourly: HourlyForecast[]; // Un tableau d'exactement 4 prévisions pour 00:00, 06:00, 12:00, et 18:00
}

interface WeatherForecast {
  airport: string; // ex: "Charles de Gaulle International"
  city: string; // ex: "Paris"
  days: DayForecast[]; // Tableau de 3 objets DayForecast pour les 3 prochains jours
  thirdDaySummary: string; // Un résumé concis d'une phrase de la tendance météo générale du troisième jour.
}`;

  const prompt = `Obtenez une prévision météo en temps réel pour ${airport.name} (${airport.iata}) à ${airport.city}, ${airport.country}. La prévision doit commencer à partir de demain et couvrir les trois prochains jours consécutifs.

Pour CHACUN des trois jours, fournissez les prévisions météo pour ces heures spécifiques UNIQUEMENT : 00:00, 06:00, 12:00 et 18:00.

Pour chaque prédiction horaire spécifique, vous DEVEZ fournir un pourcentage de 'probability'. Ce pourcentage doit refléter la probabilité en temps réel que la 'condition' prédite se produise réellement à cette heure précise.

Crucialement, vous devez vérifier méticuleusement toutes les données, en particulier les pourcentages de 'probability', par rapport aux données météorologiques les plus récentes de vos résultats de recherche. N'utilisez pas de valeurs par défaut comme 0% à moins qu'il ne s'agisse d'une quasi-certitude vérifiée basée sur les données. La précision et la fiabilité des prédictions sont primordiales.

Enfin, fournissez un "thirdDaySummary". Il doit s'agir d'un résumé concis d'une phrase de la tendance météorologique générale spécifiquement pour le troisième et dernier jour de la prévision (par exemple, "La journée commencera fraîche et nuageuse, s'éclaircissant dans l'après-midi pour une soirée ensoleillée."). Ce résumé est crucial.

Répondez UNIQUEMENT avec un objet JSON valide qui adhère à l'interface TypeScript suivante, avec les jours de la semaine (day) en français (par ex. "Lundi", "Mardi", etc.). N'incluez aucun autre texte, explication ou formatage markdown comme \`\`\`json.
${weatherForecastInterfaceString}
`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let jsonString = response.text;
    
    const match = jsonString.match(/{[\s\S]*}/);
    if (!match) {
        throw new Error("Aucun objet JSON valide trouvé dans la réponse de l'API.");
    }
    jsonString = match[0];
    
    const weatherData: WeatherForecast = JSON.parse(jsonString);
    
    if (weatherData.days.length > 3) {
      weatherData.days = weatherData.days.slice(0, 3);
    }
    
    return weatherData;
  } catch (error) {
    console.error("Error fetching or parsing weather forecast:", error);
    throw new Error("Impossible de récupérer ou d'analyser les données météo de l'API Gemini.");
  }
};

export const getTravelTip = async (condition: string, city: string): Promise<string> => {
  const prompt = `Basé sur une prévision de "${condition}" à ${city}, donnez-moi un seul conseil de voyage court et utile, en français. Par exemple, 'Prévoyez un parapluie !' ou 'Temps parfait pour une promenade au parc !'`;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching travel tip:", error);
    return "Impossible de générer un conseil de voyage pour le moment.";
  }
};

export const getMapInfo = async (airport: Airport, userLocation: { latitude: number; longitude: number; } | null): Promise<MapInfo> => {
  const prompt = `Montrez-moi l'emplacement de ${airport.name} (${airport.iata}) à ${airport.city} sur une carte et listez 3 lieux d'intérêt à proximité comme des restaurants, des cafés ou des attractions.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: userLocation ? {
          retrievalConfig: {
            latLng: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }
          }
        } : undefined,
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];
    let mapUri = '';
    let mapTitle = '';
    const nearbyPlaces: { title: string; uri: string }[] = [];

    chunks.forEach(chunk => {
      if (chunk.maps) {
        if (!mapUri) {
          mapUri = chunk.maps.uri;
          mapTitle = chunk.maps.title;
        }
        
        chunk.maps.placeAnswerSources?.forEach(source => {
            source.reviewSnippets?.forEach(snippet => {
                if(snippet.title && snippet.uri && nearbyPlaces.length < 3){
                    nearbyPlaces.push({title: snippet.title, uri: snippet.uri});
                }
            })
        })
      }
    });

    if (!mapUri) {
        mapUri = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${airport.name}, ${airport.city}`)}`;
        mapTitle = `Carte de ${airport.name}`;
    }

    return { mapUri, mapTitle, nearbyPlaces };

  } catch (error) {
    console.error("Error fetching map info:", error);
    throw new Error("Impossible de récupérer les données cartographiques de l'API Gemini.");
  }
};