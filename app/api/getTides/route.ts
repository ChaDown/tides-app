import { NextApiRequest, NextApiResponse } from 'next';
import { SingleDayTide, filteredTide } from '@/app/interfaces';
import tideData from '../../../data/tideData';

export async function GET(req: NextApiRequest) {

  const url = req.url;

  // Get today's date in ISO 8601 format.
  const today = new Date().toISOString().split('T')[0];
  // Get next 2 days 
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  // Get the day after tomorrow's date
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(new Date().getDate() + 2);
  const dayAfterTomorrowFormatted = dayAfterTomorrow.toISOString().split('T')[0];


  if (url) {
    const { searchParams } = new URL(url);
    const stationID = searchParams.get('stationID');
    // Now you can use stationID in your logic

    // Find the station in your data
    const stationData = tideData.filter((entry) => entry.stationID === stationID);
    // Find tide data for any date
    const getDateData = (date: string) => {
    const dataArr = stationData[0].data;
    const dateData = dataArr.filter((entry) => entry[1].startsWith(date));
    return dateData;
};  

if (stationData.length === 0) {
  return new Response('Station not found', {
    status: 404,
  }); 
}

  // Get tide data for today
  const todayData: SingleDayTide[] = getDateData(today);
  const tomorrowData: SingleDayTide[] = getDateData(tomorrowFormatted);
  const dayAfterTomorrowData: SingleDayTide[] = getDateData(dayAfterTomorrowFormatted);

  const result: filteredTide = {
    today: todayData,
    todayNext: tomorrowData,
    todayNextNext: dayAfterTomorrowData
  }

  return new Response(JSON.stringify(result), {
    status: 200,
  });


  } else { 
    return new Response('StationID required', {
      status: 400,
    });
  }

}