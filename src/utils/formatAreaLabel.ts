import { VenueData } from '@/dependencies/types';

export const areaUnitLabels = {
  'square-foot': {
    singular: 'square foot',
    plural: 'square feet',
  },
  'square-meter': {
    singular: 'square meter',
    plural: 'square meters',
  },
};

export function formatAreaLabel(areaSize?: VenueData['areaSize']): string {
  if (!areaSize) return '';

  const { value, units } = areaSize;
  const labels = areaUnitLabels[units];

  if (!labels) {
    return `${value} ${units}`;
  }

  const label = value > 1 ? labels.plural : labels.singular;
  return ` ${label}`;
}
