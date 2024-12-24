import { useActivities } from '@/app/(frontend)/hooks/useActivities';
import { useLocationNamesData } from '@/app/(frontend)/hooks/useLocationNamesData';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import magnifierIcon from '@/assets/imgs/magnifier.svg';
import Image from 'next/image';
import clsx from 'clsx';

const findByDocId = <T extends { id: string | number }>(
  data: T[],
  id: string | number,
): T | undefined => {
  return data.find((item) => item.id == id);
};

function SearchBar({ withMobileSearchBar }: { withMobileSearchBar: boolean }) {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationName') || '';
  const activityId = searchParams.get('activity') || '';

  const { locationNames } = useLocationNamesData();
  const { activities } = useActivities();

  const currentLocation = useMemo(
    () => findByDocId(locationNames, locationId),
    [locationNames, locationId],
  );

  const currentActivity = useMemo(
    () => findByDocId(activities, activityId),
    [activities, activityId],
  );

  const value = useMemo(() => {
    return [currentActivity?.title, currentLocation?.name]
      .filter(Boolean)
      .join(', ');
  }, [currentLocation?.name, currentActivity?.title]);

  return (
    <div
      className={clsx(
        'relative max-h-[38px] flex items-center bg-mainGrey-50 lg:ml-5 xs:ml-3 px-[14px] xs:max-w-[auto] max-w-[59%] max-[450px]:h-[33px]',
        { 'max-xl:hidden': !withMobileSearchBar },
      )}
    >
      <Image src={magnifierIcon} alt="magnifier" />
      <div className="min-w-[140px] min-h-[33px] w-full max-h-[38px] xs:w-[auto] py-2.5 px-5 bg-mainGrey-50 shadow-sm text-sm sm:leading-6 text-white max-[450px]:h-[33px] overflow-hidden text-nowrap">
        {value}
      </div>
    </div>
  );
}

export default SearchBar;
