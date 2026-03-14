export interface Neighborhood {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  { name: "Clarendon", lat: 38.8867, lng: -77.0946, description: "Arlington's vibrant dining and nightlife corridor" },
  { name: "Ballston", lat: 38.8822, lng: -77.1116, description: "A walkable urban hub with top-notch amenities" },
  { name: "Rosslyn", lat: 38.8964, lng: -77.0719, description: "Skyline living with quick access to D.C." },
  { name: "Crystal City", lat: 38.8577, lng: -77.0498, description: "Modern high-rises and Amazon HQ2 neighbor" },
  { name: "Pentagon City", lat: 38.8625, lng: -77.0599, description: "Convenient metro-accessible living" },
  { name: "Columbia Pike", lat: 38.8623, lng: -77.0869, description: "Diverse, family-friendly community with local charm" },
  { name: "Shirlington", lat: 38.8432, lng: -77.0740, description: "A walkable village with theaters, shops, and restaurants" },
  { name: "Lyon Village", lat: 38.8910, lng: -77.0830, description: "Tree-lined streets and charming bungalows" },
  { name: "Cherrydale", lat: 38.8935, lng: -77.1050, description: "Quiet residential neighborhood with historic character" },
  { name: "Courthouse", lat: 38.8903, lng: -77.0857, description: "Urban convenience near Arlington's civic center" },
  { name: "Virginia Square", lat: 38.8833, lng: -77.1033, description: "Home to George Mason University's Arlington campus" },
  { name: "Bluemont", lat: 38.8720, lng: -77.1210, description: "Parks, trails, and a peaceful suburban feel" },
  { name: "McLean", lat: 38.9339, lng: -77.1773, description: "Prestigious estates and top-rated schools in Fairfax County" },
  { name: "Alexandria", lat: 38.8048, lng: -77.0469, description: "Historic Old Town charm with waterfront living" },
  { name: "Falls Church", lat: 38.8829, lng: -77.1711, description: "The Little City with big community spirit" },
];
