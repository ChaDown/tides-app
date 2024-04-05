import React from 'react';
import { FilteredTide } from './interfaces';
import TideDataTable from './TideDataTable';
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons'; // Import the icon from 'ionicons/icons'

interface TideStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  tideData: FilteredTide | null;
}

const TideStationModal: React.FC<TideStationModalProps> = ({
  isOpen,
  onClose,
  stationName,
  tideData,
}) => {

  const [dayIndex, setDayIndex] = useState<number>(0);

  const calculatePercentageHighTide = () => {
    if (!tideData) return 0; // Return 0 if tide data is not available
  
    // Get current time in Irish time
    const currentTimeIrish = new Date().toLocaleString("en-US", { timeZone: "Europe/Dublin" });
  
    // Find the closest future tide time
    let closestFutureTide = null;
    let closestTideType = null;
  
    for (let i = 0; i < tideData.today.length; i++) {
      // Parse tide time from tideData and convert to Irish time
      const tideTime = new Date(tideData.today[i][1]).toLocaleString("en-US", { timeZone: "Europe/Dublin" });
  
      // Check if the tide is in the future and closer than the previously found tide
      if (new Date(tideTime) > new Date(currentTimeIrish) && (!closestFutureTide || new Date(tideTime) < new Date(closestFutureTide))) {
        closestFutureTide = tideTime;
        closestTideType = tideData.today[i][4]; // Assuming tide type is in the fifth element of the array
      }
    }
  
    // If no future tide time found, return 0
    if (!closestFutureTide) return 0;
  
    // Calculate time until the closest future tide
    const timeUntilNextTide = new Date(closestFutureTide).getTime() - new Date(currentTimeIrish).getTime();
  
    // Calculate tidal swing
    const tidalSwing = 22350000; // Average swing of 6 hours 12.5 mins
  
    // Calculate percentage of high tide
    let percentageHighTide = 0;
    if (closestTideType === "HIGH") {
      percentageHighTide = ((tidalSwing - timeUntilNextTide) / tidalSwing) * 100;
    } else if (closestTideType === "LOW") {
      percentageHighTide = (timeUntilNextTide / tidalSwing) * 100;
    }
  
    return percentageHighTide;
  };
  

  // const calculatePercentageHighTide = () => {
  //   if (!tideData) return 0; // Return 0 if tide data is not available
  
  //   // Get current time in UTC
  //   const currentTimeUTC = new Date();
  
  //   // Convert current time to Irish time
  //   const currentTimeIrish = new Date(currentTimeUTC.toLocaleString("en-US", { timeZone: "Europe/Dublin" }));
  
  //   // Find the closest future tide time
  //   let closestFutureTide = null;
  //   let closestTideType = null;
  
  //   for (let i = 0; i < tideData.today.length; i++) {
  //     // Parse tide time from tideData and convert to Irish time
  //     const tideTimeIrish = new Date(tideData.today[i][1]).toLocaleString("en-US", { timeZone: "Europe/Dublin" });
  
  //     // Check if the tide is in the future and closer than the previously found tide
  //     if (new Date(tideTimeIrish) > new Date(currentTimeIrish) && !closestFutureTide || new Date(tideTimeIrish) < new Date(closestFutureTide)) {
  //       closestFutureTide = (tideTimeIrish);
  //       closestTideType = tideData.today[i][4]; // Assuming tide type is in the fifth element of the array
  //     }
  //   }
  
  //   // If no future tide time found, return 0
  //   if (!closestFutureTide) return 0;
  
  //   // Calculate time until the closest future tide
  //   const timeUntilNextTide = closestFutureTide - currentTimeIrish.getTime();
  
  //   // Calculate percentage of high tide based on tidal swing
  //   const tidalSwing = 22350000; // Average swing of 6 hours 12.5 mins
  //   let percentageHighTide = 0;
  //   if (closestTideType === "HIGH") {
  //     percentageHighTide = (((tidalSwing - timeUntilNextTide) / tidalSwing) * 100); // Assuming tidalSwing is defined
  //     console.log("High Tide percent" + percentageHighTide);
  //   } else if (closestTideType === "LOW") {
  //     percentageHighTide = ((1 - (timeUntilNextTide / tidalSwing)) * 100);
  //     console.log("High Tide percent to low" + percentageHighTide);
  //   }
  
  //   return percentageHighTide;
  // };

//   // Want to find the nearest full tide time and colour the modal accordingly
//   // Calculate time until the next tide
// const calculatePercentageHighTide = () => {
//   if (!tideData) return 0; // Return 0 if tide data is not available
//   const currentTime = new Date().getTime(); // Current time in milliseconds in UTC
//   // const timezoneOffsetMs = new Date().getTimezoneOffset() * 60000; //irish timezone offset
//   // const currentTime = UTCTime + timezoneOffsetMs; // Current irish time in ms
  
//   // Find the closest future tide time
//   let closestFutureTide = null; // Initialize closest future tide time as null
//   let closestTideType = null;

//   for (let i = 0; i < tideData.today.length; i++) {
//     // Need to slice to isolate the time part
//     const tideTimeObj = new Date(tideData.today[i][1]);
//     const tideTime = tideTimeObj.getTime() + 3600000;
//     if (tideTime > currentTime && (!closestFutureTide || tideTime < closestFutureTide)) {
//       closestFutureTide = tideTime;
//       closestTideType = tideData.today[i][4];
//     }
//   }

//   // If no future tide time found, return 0
//   if (!closestFutureTide) return 0;

//   // Calculate time until the closest future tide
//   const timeUntilNextTide = closestFutureTide - currentTime;

//   // Now calculate percentage full tide, based on a tidal swing of 372.5 minutes (avg) in ms 22350000
//   let percentageHighTide = 0;

//   if (closestTideType && closestTideType == "HIGH") {
//     percentageHighTide = ((22350000 - timeUntilNextTide) / 22350000) * 100;
//   }

//   if (closestTideType && closestTideType == "LOW") {
//     percentageHighTide = (timeUntilNextTide / 22350000) * 100;
//   }

//   return percentageHighTide;
// };

  // Calculate percentage high tide
  const percentageHighTide = calculatePercentageHighTide();

  // Dynamically generate the gradient background style, only want it for today
  const modalBackgroundStyle = dayIndex === 0 ? {
    background: `linear-gradient(to bottom, #ffffff ${100 - percentageHighTide}%, #a8cbff ${100 - percentageHighTide}%)`,
  } : {};


  if (!isOpen) return null;

    // Handle click on backdrop to close the modal
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      // Close the modal only if the backdrop is clicked (not the modal content)
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    // Function to change the Station names to make them prettier! 
    function capitalizeAndReplace(str: String) {
      // Split the string into an array of words
      const words = str.split('_');
    
      // Capitalize the first letter of each word and join them with spaces
      const capitalizedWords = words.map(word => {
        // Capitalize the first letter of the word
        const capitalizedFirstLetter = word.charAt(0).toUpperCase();
        // Concatenate the capitalized first letter with the rest of the word
        const capitalizedWord = capitalizedFirstLetter + word.slice(1);
        return capitalizedWord;
      });
    
      // Join the capitalized words with spaces
      const result = capitalizedWords.join(' ');
    
      return result;
    }

  
//   // Seperate the different days tide into an array
// const dailyTidesArray = [];

//   if (tideData) {
//     dailyTidesArray.push(tideData.today, tideData.todayNext, tideData.todayNextNext);
//   }

  // Click button for which day is rendered
  const handleClickNext = () => {
    if (dayIndex < 2) setDayIndex(dayIndex+1);
    else setDayIndex(0);
  }



  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleBackdropClick}>
   <div className="bg-white p-4 rounded-md sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/6" style={modalBackgroundStyle}>
        <h2 className="text-xl font-bold mb-2">{capitalizeAndReplace(stationName)}</h2>
        <div className='flex justify-between my-2'>
        {dayIndex === 0 && <div>Today</div>}
        {dayIndex === 1 && <div>Today + 1</div>}
        {dayIndex === 2 && <div>Today + 2</div>}
        <button
        className="flex items-center justify-center bg-orange-500 text-white rounded-full w-6 h-6"
        onClick={handleClickNext}
      >
        <div className="flex items-center justify-center w-6 h-6 bg-orange rounded-full">
          <IonIcon icon={chevronForwardOutline} className="text-white" style={{ fontSize: "0.9rem" }}  />
        </div>
      </button>
          </div>
        <TideDataTable tideData={tideData} dayIndex={dayIndex}/>
        <button className="mt-2 p-1 bg-orange-400 text-white rounded-md float-right" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TideStationModal;

{/* <div className="bg-white p-4 rounded-md sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/6">
        <h2 className="text-xl font-bold mb-2">{capitalizeAndReplace(stationName)}</h2>
        <div className='flex justify-between my-2'>
        {dayIndex === 0 && <div>Today</div>}
        {dayIndex === 1 && <div>Today + 1</div>}
        {dayIndex === 2 && <div>Today + 2</div>}
        <button
        className="flex items-center justify-center bg-orange-500 text-white rounded-full w-6 h-6"
        onClick={handleClickNext}
      >
        <div className="flex items-center justify-center w-6 h-6 bg-orange rounded-full">
          <IonIcon icon={chevronForwardOutline} className="text-white" style={{ fontSize: "0.9rem" }}  />
        </div>
      </button>
          </div>
        <TideDataTable tideData={tideData} dayIndex={dayIndex}/>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded-md" onClick={onClose}>
          Close
        </button>
      </div> */}