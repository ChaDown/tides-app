import { FilteredTide, SingleDayTide } from './interfaces';

// Define props interface
interface TideStationModalProps {
    tideData: FilteredTide;
    dayIndex: number;
  }

const TideStationModal: React.FC<TideStationModalProps> = ({tideData, dayIndex}) => {

// Seperate the different days tide into an array
const dailyTidesArray = [];

if (tideData) {
  dailyTidesArray.push(tideData.today, tideData.todayNext, tideData.todayNextNext);
}
    return (
<section>
    {dailyTidesArray[dayIndex].map((el, index) => {

        const formatType = el[4].charAt(0).toUpperCase() + el[4].slice(1).toLowerCase();
        const formatTime = el[1].slice(11,16);
        const formatHeight = el[5].toFixed(2);
        return (
            <div className='tide-reading' key={index}>{`${formatType}: ${formatTime} - ${formatHeight}m`}
            </div>
        )
    })}
</section>
    )

}

export default TideStationModal;