
import { AirportContinent } from './types';

export const AIRPORT_DATA: AirportContinent[] = [
  {
    continent: 'Amérique du Nord',
    regions: [
      {
        region: 'États-Unis',
        airports: [
          { name: 'Hartsfield-Jackson Atlanta International', iata: 'ATL', city: 'Atlanta', country: 'États-Unis' },
          { name: 'Los Angeles International', iata: 'LAX', city: 'Los Angeles', country: 'États-Unis' },
          { name: 'O\'Hare International', iata: 'ORD', city: 'Chicago', country: 'États-Unis' },
          { name: 'Dallas/Fort Worth International', iata: 'DFW', city: 'Dallas', country: 'États-Unis' },
          { name: 'Denver International', iata: 'DEN', city: 'Denver', country: 'États-Unis' },
          { name: 'John F. Kennedy International', iata: 'JFK', city: 'New York', country: 'États-Unis' },
          { name: 'San Francisco International', iata: 'SFO', city: 'San Francisco', country: 'États-Unis' },
          { name: 'Seattle-Tacoma International', iata: 'SEA', city: 'Seattle', country: 'États-Unis' },
          { name: 'Harry Reid International Airport', iata: 'LAS', city: 'Las Vegas', country: 'États-Unis' },
          { name: 'Miami International', iata: 'MIA', city: 'Miami', country: 'États-Unis' },
          { name: 'Orlando International', iata: 'MCO', city: 'Orlando', country: 'États-Unis' },
          { name: 'Charlotte Douglas International', iata: 'CLT', city: 'Charlotte', country: 'États-Unis' },
        ],
      },
      {
        region: 'Canada',
        airports: [
          { name: 'Toronto Pearson International', iata: 'YYZ', city: 'Toronto', country: 'Canada' },
          { name: 'Vancouver International', iata: 'YVR', city: 'Vancouver', country: 'Canada' },
          { name: 'Montréal–Trudeau International', iata: 'YUL', city: 'Montreal', country: 'Canada' },
          { name: 'Calgary International', iata: 'YYC', city: 'Calgary', country: 'Canada' },
        ],
      },
       {
        region: 'Mexique',
        airports: [
            { name: 'Mexico City International', iata: 'MEX', city: 'Mexico City', country: 'Mexique' },
            { name: 'Cancún International', iata: 'CUN', city: 'Cancún', country: 'Mexique' },
            { name: 'Guadalajara International', iata: 'GDL', city: 'Guadalajara', country: 'Mexique' },
        ]
      }
    ],
  },
  {
    continent: 'Europe',
    regions: [
      {
        region: 'Royaume-Uni',
        airports: [
          { name: 'London Heathrow Airport', iata: 'LHR', city: 'London', country: 'Royaume-Uni' },
          { name: 'London Gatwick Airport', iata: 'LGW', city: 'London', country: 'Royaume-Uni' },
          { name: 'Manchester Airport', iata: 'MAN', city: 'Manchester', country: 'Royaume-Uni' },
          { name: 'London Stansted Airport', iata: 'STN', city: 'London', country: 'Royaume-Uni' },
        ],
      },
      {
        region: 'France',
        airports: [
          { name: 'Charles de Gaulle International', iata: 'CDG', city: 'Paris', country: 'France' },
          { name: 'Orly International Airport', iata: 'ORY', city: 'Paris', country: 'France' },
          { name: 'Nice Côte d\'Azur Airport', iata: 'NCE', city: 'Nice', country: 'France' },
        ],
      },
      {
        region: 'Allemagne',
        airports: [
          { name: 'Frankfurt Airport', iata: 'FRA', city: 'Frankfurt', country: 'Allemagne' },
          { name: 'Munich Airport', iata: 'MUC', city: 'Munich', country: 'Allemagne' },
          { name: 'Berlin Brandenburg Airport', iata: 'BER', city: 'Berlin', country: 'Allemagne' },
        ],
      },
      {
        region: 'Espagne',
        airports: [
          { name: 'Adolfo Suárez Madrid–Barajas Airport', iata: 'MAD', city: 'Madrid', country: 'Espagne' },
          { name: 'Barcelona–El Prat Airport', iata: 'BCN', city: 'Barcelona', country: 'Espagne' },
          { name: 'Palma de Mallorca Airport', iata: 'PMI', city: 'Palma', country: 'Espagne' },
        ],
      },
      {
        region: 'Pays-Bas',
        airports: [
          { name: 'Amsterdam Airport Schiphol', iata: 'AMS', city: 'Amsterdam', country: 'Pays-Bas' },
        ],
      },
      {
        region: 'Turquie',
        airports: [
          { name: 'Istanbul Airport', iata: 'IST', city: 'Istanbul', country: 'Turquie' },
          { name: 'Antalya Airport', iata: 'AYT', city: 'Antalya', country: 'Turquie' },
        ],
      },
      {
        region: 'Italie',
        airports: [
          { name: 'Leonardo da Vinci–Fiumicino Airport', iata: 'FCO', city: 'Rome', country: 'Italie' },
          { name: 'Milan Malpensa Airport', iata: 'MXP', city: 'Milan', country: 'Italie' },
        ],
      },
    ],
  },
  {
    continent: 'Asie',
    regions: [
      {
        region: 'Chine',
        airports: [
          { name: 'Beijing Capital International', iata: 'PEK', city: 'Beijing', country: 'Chine' },
          { name: 'Shanghai Pudong International', iata: 'PVG', city: 'Shanghai', country: 'Chine' },
          { name: 'Hong Kong International Airport', iata: 'HKG', city: 'Hong Kong', country: 'Chine' },
          { name: 'Guangzhou Baiyun International', iata: 'CAN', city: 'Guangzhou', country: 'Chine' },
        ],
      },
      {
        region: 'Japon',
        airports: [
          { name: 'Haneda International Airport', iata: 'HND', city: 'Tokyo', country: 'Japon' },
          { name: 'Narita International Airport', iata: 'NRT', city: 'Tokyo', country: 'Japon' },
          { name: 'Kansai International Airport', iata: 'KIX', city: 'Osaka', country: 'Japon' },
        ],
      },
      {
        region: 'Émirats arabes unis',
        airports: [
            { name: 'Dubai International Airport', iata: 'DXB', city: 'Dubai', country: 'EAU' },
            { name: 'Abu Dhabi International Airport', iata: 'AUH', city: 'Abu Dhabi', country: 'EAU' },
        ]
      },
      {
        region: 'Singapour',
        airports: [
            { name: 'Singapore Changi Airport', iata: 'SIN', city: 'Singapore', country: 'Singapour' },
        ]
      },
      {
        region: 'Corée du Sud',
        airports: [
            { name: 'Incheon International Airport', iata: 'ICN', city: 'Seoul', country: 'Corée du Sud' },
        ]
      },
      {
        region: 'Inde',
        airports: [
          { name: 'Indira Gandhi International Airport', iata: 'DEL', city: 'Delhi', country: 'Inde' },
          { name: 'Chhatrapati Shivaji Maharaj International', iata: 'BOM', city: 'Mumbai', country: 'Inde' },
          { name: 'Kempegowda International Airport', iata: 'BLR', city: 'Bengaluru', country: 'Inde' },
        ],
      },
      {
        region: 'Qatar',
        airports: [
            { name: 'Hamad International Airport', iata: 'DOH', city: 'Doha', country: 'Qatar' },
        ]
      },
    ],
  },
   {
    continent: 'Amérique du Sud',
    regions: [
        {
            region: 'Brésil',
            airports: [
                { name: 'São Paulo/Guarulhos International', iata: 'GRU', city: 'São Paulo', country: 'Brésil' },
                { name: 'Rio de Janeiro–Galeão International', iata: 'GIG', city: 'Rio de Janeiro', country: 'Brésil' },
            ]
        },
        {
            region: 'Colombie',
            airports: [
                { name: 'El Dorado International', iata: 'BOG', city: 'Bogotá', country: 'Colombie' },
            ]
        },
        {
            region: 'Chili',
            airports: [
                { name: 'Arturo Merino Benítez International', iata: 'SCL', city: 'Santiago', country: 'Chili' },
            ]
        },
        {
            region: 'Argentine',
            airports: [
                { name: 'Ministro Pistarini International', iata: 'EZE', city: 'Buenos Aires', country: 'Argentine' },
            ]
        },
        {
            region: 'Pérou',
            airports: [
                { name: 'Jorge Chávez International', iata: 'LIM', city: 'Lima', country: 'Pérou' },
            ]
        }
    ]
  },
  {
    continent: 'Afrique',
    regions: [
        {
            region: 'Afrique du Nord',
            airports: [
                { name: 'Cairo International Airport', iata: 'CAI', city: 'Cairo', country: 'Égypte' },
                { name: 'Mohammed V International Airport', iata: 'CMN', city: 'Casablanca', country: 'Maroc' },
                { name: 'Houari Boumediene Airport', iata: 'ALG', city: 'Algiers', country: 'Algérie' },
                { name: 'Tunis-Carthage International', iata: 'TUN', city: 'Tunis', country: 'Tunisie' },
            ]
        },
        {
            region: 'Afrique de l\'Ouest',
            airports: [
                { name: 'Murtala Muhammed International Airport', iata: 'LOS', city: 'Lagos', country: 'Nigéria' },
                { name: 'Kotoka International Airport', iata: 'ACC', city: 'Accra', country: 'Ghana' },
                { name: 'Blaise Diagne International Airport', iata: 'DSS', city: 'Dakar', country: 'Sénégal' },
                { name: 'Félix-Houphouët-Boigny International', iata: 'ABJ', city: 'Abidjan', country: 'Côte d\'Ivoire' },
            ]
        },
        {
            region: 'Afrique centrale',
            airports: [
                 { name: 'N\'djili International Airport', iata: 'FIH', city: 'Kinshasa', country: 'RD Congo' },
                 { name: 'Douala International Airport', iata: 'DLA', city: 'Douala', country: 'Cameroun' },
            ]
        },
        {
            region: 'Afrique de l\'Est',
            airports: [
                { name: 'Bole International Airport', iata: 'ADD', city: 'Addis Ababa', country: 'Éthiopie' },
                { name: 'Jomo Kenyatta International Airport', iata: 'NBO', city: 'Nairobi', country: 'Kenya' },
                 { name: 'Julius Nyerere International Airport', iata: 'DAR', city: 'Dar es Salaam', country: 'Tanzanie' },
            ]
        },
        {
            region: 'Afrique australe',
            airports: [
                { name: 'O. R. Tambo International', iata: 'JNB', city: 'Johannesburg', country: 'Afrique du Sud' },
                { name: 'Cape Town International Airport', iata: 'CPT', city: 'Cape Town', country: 'Afrique du Sud' },
                { name: 'King Shaka International', iata: 'DUR', city: 'Durban', country: 'Afrique du Sud' },
            ]
        }
    ]
  },
  {
    continent: 'Océanie',
    regions: [
        {
            region: 'Australie',
            airports: [
                { name: 'Sydney Kingsford Smith International', iata: 'SYD', city: 'Sydney', country: 'Australie' },
                { name: 'Melbourne International Airport', iata: 'MEL', city: 'Melbourne', country: 'Australie' },
                { name: 'Brisbane International Airport', iata: 'BNE', city: 'Brisbane', country: 'Australie' },
                { name: 'Perth Airport', iata: 'PER', city: 'Perth', country: 'Australie' },
            ]
        },
        {
            region: 'Nouvelle-Zélande',
            airports: [
                { name: 'Auckland International Airport', iata: 'AKL', city: 'Auckland', country: 'Nouvelle-Zélande' },
                { name: 'Christchurch International Airport', iata: 'CHC', city: 'Christchurch', country: 'Nouvelle-Zélande' },
            ]
        }
    ]
  }
];