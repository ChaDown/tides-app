import { StationInfo } from './interfaces';
import addIcon from './add-circle.svg';
import { useState, useEffect } from 'react';
import { TideEntry } from './interfaces';

const TideStation: React.FC<StationInfo> = ({ stationName }) => {
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
    <div>
      <img src={addIcon} alt='Add Icon' />
      <p>{tideData?.data}</p>
    </div>
  );
};

export default TideStation;
