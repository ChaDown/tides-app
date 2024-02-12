"use client"
import { StationInfo } from './interfaces';
import addIcon from './add-circle.svg';
import buoyIcon from './buoy.png';
import { useState, useEffect } from 'react';
import { TideEntry } from './interfaces';
import TideStationModal from './TideStationModal'; // Import the TideStationModal component


const TideStation: React.FC<StationInfo> = ({ stationName, coords }) => {
  const [tideData, setTideData] = useState<TideEntry>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for controlling modal visibility


  useEffect(() => {
    const fetchTideData = async () => {
      const response = await fetch(`/api/getTides?stationID=${stationName}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tide data: ${response.statusText}`);
      }
      const data: TideEntry = await response.json();
     
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
    <div>
<button>
  <img
    src='./buoy.png'
    alt="Tide station buoy icon clickable"
    style={{
      position: 'absolute',
      left: `${coords[0]}%`,
      top: `${coords[1]}%`,
      height: '2rem'
    }}
    className="animate-flash"
    onClick={handleIconClick}
  />
</button>
 <TideStationModal isOpen={isModalOpen} onClose={handleCloseModal} stationName={stationName} tideData={tideData} />
 </div>
  )
};

export default TideStation;
