export type WithStrapiFields<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type TypeData = WithStrapiFields<{
  title: string;
}>;

export type ActivitieData = WithStrapiFields<{
  title: string;
  type: TypeData;
  priceRange: string;
}>;

export type FilterData = WithStrapiFields<{
  title: string;
  tags: { docs: TypeData[] };
}>;

export type ActivityData = WithStrapiFields<{
  title: string;
}>;

export type strapiImage = {
  id: number;
  width: number;
  height: number;
  url: string;
};

export type LocationName = WithStrapiFields<{
  name: string;
}>;

export type AvailabilityText = {
  isAvailable: boolean;
  additionalInfo: string | null;
};

export type FormData = {
  date: Date | null;
  start: Date | null;
  end: Date | null;
  email: string;
  phone: string;
};

export type FormDataSubmit = {
  desiredVenue?: number;
  date: Date | null;
  start: Date | null;
  end: Date | null;
  email: string;
  phone: string;
};

export type FormOnboardData = {
  activities?: string;
  tags?: number[];
  address?: string;
  cancellationPolicy?: string;
  companyName?: string;
  contactInformation?: string;
  diningCapacity?: string;
  minimumCancellationDuration?: string;
  operationalHours?: string;
  pricingModel?: string;
  seatingCapacity?: string;
  spaceName?: string;
  standingCapacity?: string;
  venueDescription?: string;
};

export type OnboardFormItem = {
  title: string;
  inputType?: 'input' | 'textArea';
  name: string;
  placeholder?: string;
};

type SpaceIncludes = {
  docs: { text: string }[];
};

export type LocationData = WithStrapiFields<{
  title: string;
  price: {
    value: number;
    per: string;
    currency: {
      name: string;
      symbol: string;
    };
  };
  maxGuestsCount: number;
  locations: WithStrapiFields<{ name: string }>[];
  benefits: string;
  rating: number;
  galleryImages: strapiImage[];
  tags: TypeData[];
  cateringAndDrinks: AvailabilityText;
  tablesAndSeating: AvailabilityText;
  alcoholicBeverages: AvailabilityText;
  restrooms: AvailabilityText;
  musicAndAV: AvailabilityText;
  allowedEvents: AvailabilityText;
  accommodation: AvailabilityText;
  parking: AvailabilityText;
  event: AvailabilityText;
  areaSize?: {
    value: number;
    units: string;
  };
  address: string;
  minBookingHours: number;
  about?: string;
  map?: strapiImage;
  policy?: string;
  policyDays?: number;
  spaceIncludes?: SpaceIncludes;
  pricePer?: string;
  activities: ActivitieData[];
  isSuperHost: boolean | null;
  isFlexible: boolean | null;
}>;
