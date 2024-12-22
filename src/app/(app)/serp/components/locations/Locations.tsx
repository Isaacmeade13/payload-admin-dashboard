import { useLocationsData } from '@/app/hooks/useLocationsData';
import SerpItem from '../serpItem/SerpItem';
import { useRemainingLocationsData } from '@/app/hooks/useRemainingLocations';

const MIN_LOCATIONS_LENGTH = 2;
function Locations() {
  const { locations } = useLocationsData();
  const { remainingLocations } = useRemainingLocationsData();
  return (
    <>
      <div className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-2 max-lg:p-0">
        {locations.map((loc) => (
          <SerpItem key={loc.documentId} location={loc} />
        ))}
        {!locations.length && <p>No matching results yet</p>}
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-2 max-lg:p-0">
        {locations.length < MIN_LOCATIONS_LENGTH &&
          remainingLocations.map((loc) => (
            <SerpItem key={loc.documentId} location={loc} />
          ))}
      </div>
    </>
  );
}

export default Locations;
