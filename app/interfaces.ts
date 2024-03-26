export interface StationInfo {
  stationName: string;
  coords: [number, number];
}

export interface TideEntry {
  stationID: string;
  data: [string, string, number, number, string, number][];
}

export interface SingleDayTide {
  0: string;
  1: string;
  2: number;
  3: number;
  4: string;
  5: number;
}

export interface FilteredTide {
  
    today: SingleDayTide[];
    todayNext: SingleDayTide[];
    todayNextNext: SingleDayTide[];
  


}

