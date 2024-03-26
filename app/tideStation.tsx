"use client"
import { StationInfo } from './interfaces';
import addIcon from './add-circle.svg';
import buoyIcon from './buoy.png';
import { useState, useEffect } from 'react';
import { FilteredTide } from './interfaces';
import TideStationModal from './TideStationModal'; // Import the TideStationModal component


const TideStation: React.FC<StationInfo> = ({ stationName, coords }) => {
  const [tideData, setTideData] = useState<FilteredTide | null>(null);;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for controlling modal visibility

  useEffect(() => {
    const fetchTideData = async () => {
      const response = await fetch(`/api/getTides?stationID=${stationName}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tide data: ${response.statusText}`);
      }
      const data: FilteredTide = await response.json();
      setTideData(data);
    };

    fetchTideData();
  }, []); // Run once on component mount

  const handleIconClick = () => {
    setIsModalOpen(true); // Open the modal when the icon is clicked
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <span>
<button onClick={handleIconClick}>
<img
  src='./buoy.png'
  alt="Tide station buoy icon clickable"
  style={{
    position: 'absolute',
    left: `${coords[0] - 2}%`,
    top: `${coords[1] - 3.5}%`,
    height: '2rem'
  }}
  className="animate-flash"
/> 
</button>
 <TideStationModal isOpen={isModalOpen} onClose={handleCloseModal} stationName={stationName} tideData={tideData} />
</span>
  )
};

export default TideStation;


