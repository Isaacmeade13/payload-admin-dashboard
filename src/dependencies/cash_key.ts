export const FILTERS = 'filters';
export const ACTIVITIES = 'activities';
export const LOCATIONS = 'locations';
export const REMAINING_LOCATIONS = 'remaining-locations';
export const LOCATION = 'location';
export const LOCATION_NAMES = 'location_names';

const getFiltersKey = (): [string] => [FILTERS];
const getActivitiesKey = (): [string] => [ACTIVITIES];
const getLocationsKey = (
  locationNameId?: string | undefined | null,
  filterIds?: string | undefined | null,
  guests?: string | undefined | null,
  price?: string | undefined | null,
  isSuperHost?: string,
  isFlexible?: string,
  activity?: string | undefined | null,
): [
  string,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
] => [
  LOCATIONS,
  locationNameId,
  filterIds,
  guests,
  price,
  isSuperHost,
  isFlexible,
  activity,
];
const getRemainingLocationsKey = (
  locationNameId?: string | undefined | null,
  filterIds?: string | undefined | null,
  guests?: string | undefined | null,
  price?: string | undefined | null,
  isSuperHost?: string,
  isFlexible?: string,
  activity?: string | undefined | null,
): [
  string,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
  string | undefined | null,
] => [
  REMAINING_LOCATIONS,
  locationNameId,
  filterIds,
  guests,
  price,
  isSuperHost,
  isFlexible,
  activity,
];
const getLocationKey = (id: string): [string, string] => [LOCATION, id];
const getLocationNamesKey = (): [string] => [LOCATION_NAMES];

export {
  getFiltersKey,
  getLocationsKey,
  getRemainingLocationsKey,
  getLocationKey,
  getLocationNamesKey,
  getActivitiesKey,
};
