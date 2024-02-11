import React from 'react';
import { TideEntry } from './interfaces';

interface TideStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  tideData: TideEntry; // Adjust the type of tideData as needed
}

const TideStationModal: React.FC<TideStationModalProps> = ({
  isOpen,
  onClose,
  stationName,
  tideData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2">{stationName}</h2>
        <p>{/* Display tideData or any other information */}</p>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TideStationModal;
