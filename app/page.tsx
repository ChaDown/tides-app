
import Image from 'next/image';
import TideStation from './tideStation';
import {stationData} from './tideStationsData';

export default function Home() {
  
  return (
    <div className='relative home-screen h-auto' >
    <img
      src='/ireland.jpg'
      alt='Ireland Tide Times Map'
      style={{ objectFit: 'cover' }}
      className='absolute inset-0 home-screen'
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
//width: '100%', height: '100%', 