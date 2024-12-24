import { useLocationsData } from '@/app/(frontend)/hooks/useLocationsData';
import SerpItem from '../serpItem/SerpItem';
import { useRemainingLocationsData } from '@/app/(frontend)/hooks/useRemainingLocations';

function Locations() {
  const { locations } = useLocationsData();
  const { remainingLocations } = useRemainingLocationsData();

  return (
    <>
      <div className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-2 max-lg:p-0">
        {locations.map((loc) => (
          <SerpItem key={loc.id} location={loc} />
        ))}
        {!locations.length && <p>No matching results yet</p>}
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-2 max-lg:p-0">
        {remainingLocations.map((loc) => (
          <SerpItem key={loc.id} location={loc} />
        ))}
      </div>
    </>
  );
}

export default Locations;
