import AccommodationIcon from '@/assets/imgs/accommodation';
import AlcoholicBeveragesIcon from '@/assets/imgs/alcoholicBeverages';
import AllowedEventsIcon from '@/assets/imgs/allowedEvents';
import CateringAndDrinksIcon from '@/assets/imgs/cateringAndDrinks';
import EventIcon from '@/assets/imgs/event';
import MusicAndAVIcon from '@/assets/imgs/musicAndAV';
import ParkingIcon from '@/assets/imgs/parking';
import RestroomsIcon from '@/assets/imgs/restrooms';
import TablesAndSeatingIcon from '@/assets/imgs/tablesAndSeating';
import { AvailabilityText } from '@/dependencies/types';
import clsx from 'clsx';

const getIconColor = (isAvailable: boolean | undefined) =>
  isAvailable ? 'black' : '#919191';

function createItemsWithIcons({
  cateringAndDrinks,
  tablesAndSeating,
  alcoholicBeverages,
  restrooms,
  musicAndAV,
  allowedEvents,
  accommodation,
  parking,
  event,
}: {
  cateringAndDrinks: AvailabilityText;
  tablesAndSeating: AvailabilityText;
  alcoholicBeverages: AvailabilityText;
  restrooms: AvailabilityText;
  musicAndAV: AvailabilityText;
  allowedEvents: AvailabilityText;
  accommodation: AvailabilityText;
  parking: AvailabilityText;
  event: AvailabilityText;
}) {
  const items = [];

  if (cateringAndDrinks) {
    items.push({
      isAvailable: cateringAndDrinks.isAvailable,
      id: 'cateringAndDrinks',
      title: 'Catering and Drinks',
      desc: cateringAndDrinks.additionalInfo,
      icon: (
        <CateringAndDrinksIcon
          color={getIconColor(
            cateringAndDrinks.isAvailable &&
              !!cateringAndDrinks.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }
  if (alcoholicBeverages) {
    items.push({
      isAvailable: alcoholicBeverages.isAvailable,
      id: 'alcoholicBeverages',
      title: 'Alcoholic Beverages',
      desc: alcoholicBeverages.additionalInfo,
      icon: (
        <AlcoholicBeveragesIcon
          color={getIconColor(
            alcoholicBeverages.isAvailable &&
              !!alcoholicBeverages.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  if (tablesAndSeating) {
    items.push({
      isAvailable: tablesAndSeating.isAvailable,
      id: 'tablesAndSeating',
      title: 'Tables and Seating',
      desc: tablesAndSeating.additionalInfo,
      icon: (
        <TablesAndSeatingIcon
          color={getIconColor(
            tablesAndSeating.isAvailable &&
              !!tablesAndSeating.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  if (restrooms) {
    items.push({
      isAvailable: restrooms.isAvailable,
      id: 'restrooms',
      title: 'Restrooms',
      desc: restrooms.additionalInfo,
      icon: (
        <RestroomsIcon
          color={getIconColor(
            restrooms.isAvailable && !!restrooms.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  if (musicAndAV) {
    items.push({
      isAvailable: musicAndAV.isAvailable,
      id: 'musicAndAV',
      title: 'Music and AV',
      desc: musicAndAV.additionalInfo,
      icon: (
        <MusicAndAVIcon
          color={getIconColor(
            musicAndAV.isAvailable &&
              !!musicAndAV.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  if (allowedEvents) {
    items.push({
      isAvailable: allowedEvents.isAvailable,
      id: 'allowedEvents',
      title: 'Allowed events',
      desc: allowedEvents.additionalInfo,
      icon: (
        <AllowedEventsIcon
          color={getIconColor(
            allowedEvents.isAvailable &&
              !!allowedEvents.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  if (accommodation) {
    items.push({
      isAvailable: accommodation.isAvailable,
      id: 'accommodation',
      title: 'Accommodation',
      desc: accommodation.additionalInfo,
      icon: (
        <AccommodationIcon
          color={getIconColor(
            accommodation.isAvailable &&
              !!accommodation.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  if (parking) {
    items.push({
      isAvailable: parking.isAvailable,
      id: 'parking',
      title: 'Parking',
      desc: parking.additionalInfo,
      icon: (
        <ParkingIcon
          color={getIconColor(
            parking.isAvailable && !!parking.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  if (event) {
    items.push({
      isAvailable: event.isAvailable,
      id: 'event',
      title: 'Event / Host rules',
      desc: event.additionalInfo,
      icon: (
        <EventIcon
          color={getIconColor(
            event.isAvailable && !!event.additionalInfo?.root?.children,
          )}
        />
      ),
    });
  }

  return items;
}

const getTitleClassName = (isAvailable: boolean | undefined) =>
  clsx(
    'w-full',
    'text-xl',
    'font-semibold',
    'max-xl:text-[20px]',
    isAvailable ? 'text-black' : 'text-[#919191]',
  );

export { createItemsWithIcons, getTitleClassName };
