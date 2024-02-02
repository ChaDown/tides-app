
import Image from 'next/image';
import TideStation from './tideStation';
import {stationData} from './tideStationsData';

export default function Home() {

  return (
    <div className='relative'>
      <img
        src='/ireland.jpg'
        alt='Ireland Tide Times Map'
        // style={{ width: '200vw', maxWidth: '200%', '!important': 'true' }}
        className='w-screen relative'
      />
      {stationData.map((station, index) => (
        <TideStation
          key={index}
          stationName={station.stationName}
          coords={station.coords}
        />
      ))}
    </div>


  );
}
