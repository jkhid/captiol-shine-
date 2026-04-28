export interface Neighborhood {
  name: string;
  lat: number;
  lng: number;
  description: string;
  zip: string;
  responseTime: string;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  { name: "Clarendon", lat: 38.8867, lng: -77.0946, description: "Arlington's vibrant dining and nightlife corridor.", zip: "22201", responseTime: "25 min" },
  { name: "Ballston", lat: 38.8822, lng: -77.1116, description: "A walkable urban hub with top-notch amenities.", zip: "22203", responseTime: "30 min" },
  { name: "Rosslyn", lat: 38.8964, lng: -77.0719, description: "Skyline living with quick access to D.C.", zip: "22209", responseTime: "30 min" },
  { name: "Crystal City", lat: 38.8577, lng: -77.0498, description: "Modern high-rises and Amazon HQ2 neighbor.", zip: "22202", responseTime: "35 min" },
  { name: "Pentagon City", lat: 38.8625, lng: -77.0599, description: "Convenient metro-accessible living.", zip: "22202", responseTime: "35 min" },
  { name: "Columbia Pike", lat: 38.8623, lng: -77.0869, description: "Diverse, family-friendly community with local charm.", zip: "22204", responseTime: "30 min" },
  { name: "Shirlington", lat: 38.8432, lng: -77.0740, description: "A walkable village with theaters, shops, and restaurants.", zip: "22206", responseTime: "40 min" },
  { name: "Lyon Village", lat: 38.891, lng: -77.083, description: "Tree-lined streets and charming bungalows.", zip: "22201", responseTime: "25 min" },
  { name: "Cherrydale", lat: 38.8935, lng: -77.105, description: "Quiet residential neighborhood with historic character.", zip: "22207", responseTime: "30 min" },
  { name: "Courthouse", lat: 38.8903, lng: -77.0857, description: "Urban convenience near Arlington's civic center.", zip: "22201", responseTime: "25 min" },
  { name: "Virginia Square", lat: 38.8833, lng: -77.1033, description: "Home to George Mason University's Arlington campus.", zip: "22201", responseTime: "28 min" },
  { name: "Bluemont", lat: 38.872, lng: -77.121, description: "Parks, trails, and a peaceful suburban feel.", zip: "22203", responseTime: "30 min" },
  { name: "McLean", lat: 38.9339, lng: -77.1773, description: "Prestigious estates and top-rated schools in Fairfax County.", zip: "22101", responseTime: "45 min" },
  { name: "Alexandria", lat: 38.8048, lng: -77.0469, description: "Historic Old Town charm with waterfront living.", zip: "22301", responseTime: "40 min" },
  { name: "Falls Church", lat: 38.8829, lng: -77.1711, description: "The Little City with big community spirit.", zip: "22042", responseTime: "40 min" },
];
