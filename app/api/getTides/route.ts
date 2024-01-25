import { NextApiRequest, NextApiResponse } from 'next';
import tideData from '../../../data/tideData';

interface QueryParameters {
  stationID: string;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('Req started');
  console.log(req.url.searchParams)
  // Get the required parameters from the request
  const stationID = req.url?.URLSearchParams.get(["stationID"]);

  console.log(stationID);

  // Ensure stationID is provided
  if (!stationID) {
    return new Response('StationID required', {
      status: 400,
    });
  }

  // Get today's date in ISO 8601 format. This method creates two arrays with the split, and we want the first half, ie [0]
  const today = new Date().toISOString().split('T')[0];

  // Find the station in your data
  const stationData = tideData.filter((entry) => entry.stationID === stationID);

  if (stationData.length == 0) {
    return new Response('Station not found', {
      status: 404,
    });
  }

  // Find tide data for any date
  const getDateData = (date: string) => {
    const dateData = stationData.filter((entry) => {
      entry.data[1].includes(date);
    });

    return dateData;
  };

  const todaysData = getDateData(today);

  return new Response(JSON.stringify(todaysData), {
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
