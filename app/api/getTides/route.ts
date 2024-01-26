import { NextApiRequest, NextApiResponse } from 'next';
import tideData from '../../../data/tideData';

interface QueryParameters {
  stationID: string;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('Req started');
  console.log(req.url)
  // Get the required parameters from the request
  const stationID = "dunmore"

  console.log(stationID);

  // Ensure stationID is provided
  if (!stationID) {
    return new Response('StationID required', {
      status: 400,
    });
  }
// Get today's date in ISO 8601 format.
const today = new Date().toISOString().split('T')[0];
console.log(today);

// Find the station in your data
const stationData = tideData.filter((entry) => entry.stationID === stationID);
console.log(stationData);

if (stationData.length === 0) {
  return new Response('Station not found', {
    status: 404,
  });
}

// Find tide data for any date
const getDateData = (date: string) => {
  console.log(date);
  console.log(stationData[0])
  const dataArr = stationData[0].data;
  const dateData = dataArr.filter((entry) => entry[1].startsWith(date));
  return dateData;
};

// Example: Get tide data for today
const todayData = getDateData(today);
console.log(todayData);

  return new Response(JSON.stringify(todayData), {
    status: 200,
  });
}

//   const stationData = tideData.find(
//     (station) => station.stationID === stationID
//   );

//   if (!stationData) {
//     return res.status(404).json({ error: 'Station not found' });
//   }
//   // Filter the required dates
//   const getInfoByDate = (date: Date) => {

//     const dateInfo.data = stationData.forEach(element => {

//   });

//    }
// }
