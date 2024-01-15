export interface StationInfo {
  stationName: string;
}

export interface TideEntry {
  stationID: string;
  data: [string, string, number, number, string, number][];
}
