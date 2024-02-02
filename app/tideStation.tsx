"use client"
import { StationInfo } from './interfaces';
import addIcon from './add-circle.svg';
import buoyIcon from './buoy.png';
import { useState, useEffect } from 'react';
import { TideEntry } from './interfaces';

const TideStation: React.FC<StationInfo> = ({ stationName, coords }) => {
  const [tideData, setTideData] = useState<TideEntry>();

  useEffect(() => {
    const fetchTideData = async () => {
      const response = await fetch(`/api/getTides?stationID=${stationName}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to fetch tide data: ${response.statusText}`);
      }
      const data: TideEntry = await response.json();
      console.log(data);
      setTideData(data);
    };

    fetchTideData();
  }, []); // Run once on component mount

  return (
<button>
  <img
    src='./buoy.png'
    alt="Tide station buoy icon"
    style={{
      position: 'absolute',
      left: `${coords[0]}%`,
      top: `${coords[1]}%`,
      height: '2rem'
    }}
    className="animate-flash"
  />
</button>
  )
};

export default TideStation;
