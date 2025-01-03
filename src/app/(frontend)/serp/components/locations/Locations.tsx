import { useVenuesData } from '@/app/(frontend)/hooks/useVenuesData';
import { useRemainingVenuesData } from '@/app/(frontend)/hooks/useRemainingVenues';

import SerpItem from '../serpItem/SerpItem';

function Locations() {
  const { venues } = useVenuesData();
  const { remainingVenues } = useRemainingVenuesData();

  return (
    <>
      <div className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-2 max-lg:p-0">
        {venues.map((loc) => (
          <SerpItem key={loc.id} location={loc} />
        ))}
        {!venues.length && <p>No matching results yet</p>}
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-2 max-lg:p-0">
        {remainingVenues.map((loc) => (
          <SerpItem key={loc.id} location={loc} />
        ))}
      </div>
    </>
  );
}

export default Locations;
