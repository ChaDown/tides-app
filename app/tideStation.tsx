"use client"
import { StationInfo } from './interfaces';
import addIcon from './add-circle.svg';
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
    <p  style={{ position: 'absolute', left: `${coords[0] -1}%`, top: `${coords[1] - 5}%`, fontSize: '3rem', color: 'red' }}>
    .
  </p>
  )
};

export default TideStation;
