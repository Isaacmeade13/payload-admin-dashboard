interface SelectedGuestCount {
  min?: number;
  max?: number;
}

interface SelectedPrice {
  min?: number;
  max?: number;
}

interface GenerateSearchUrlParams {
  selectedLocation?: string | undefined;
  selectedFilterIds?: string[];
  selectedGuestCount?: SelectedGuestCount;
  selectedPrice?: SelectedPrice;
  isSuperHost?: boolean;
  isFlexible?: boolean;
  selectedActivity?: string | null | undefined;
}

export function generateSearchUrl({
  selectedLocation,
  selectedFilterIds,
  selectedGuestCount,
  selectedPrice,
  isSuperHost,
  isFlexible,
  selectedActivity,
}: GenerateSearchUrlParams): string {
  const url = new URL('/serp', window.location.origin);

  if (selectedLocation?.length) {
    url.searchParams.set('locationName', selectedLocation);
  }

  if (selectedActivity?.length) {
    url.searchParams.set('activity', selectedActivity);
  }

  if (selectedFilterIds && selectedFilterIds?.length > 0) {
    const filterIds = selectedFilterIds.join(',');
    url.searchParams.set('filters', filterIds);
  }

  if (selectedGuestCount && selectedGuestCount?.min !== undefined) {
    url.searchParams.set('min-guests', String(selectedGuestCount.min));
  }

  if (selectedGuestCount && selectedGuestCount?.max !== undefined) {
    url.searchParams.set('max-guests', String(selectedGuestCount.max));
  }

  if (selectedPrice && selectedPrice?.min !== undefined) {
    url.searchParams.set('min-price', String(selectedPrice.min));
  }

  if (selectedPrice && selectedPrice?.max !== undefined) {
    url.searchParams.set('max-price', String(selectedPrice.max));
  }

  if (isSuperHost) {
    url.searchParams.set('is-super-host', String(isSuperHost));
  }

  if (isFlexible) {
    url.searchParams.set('is-flexible', String(isFlexible));
  }

  return url.toString();
}
