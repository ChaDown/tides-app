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
      <div className="bg-white p-4 rounded-md sm:w-2/3 md:w-2/3 lg:w-1/5 xl:w-1/6">
        <h2 className="text-xl font-bold mb-2">{capitalizeAndReplace(stationName)}</h2>
        <div className='flex justify-between my-2'>
        {dayIndex === 0 && <div>Today</div>}
        {dayIndex === 1 && <div>Tomorrow</div>}
        {dayIndex === 2 && <div>Day After Tomorrow</div>}
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
      </div>
    </div>
  );
};

export default TideStationModal;
