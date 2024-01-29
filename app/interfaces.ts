export interface StationInfo {
  stationName: string;
  coords: [number, number];
}

export interface TideEntry {
  stationID: string;
  data: [string, string, number, number, string, number][];
}
