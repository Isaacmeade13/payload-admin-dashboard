export type WithStrapiFields<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type TypeData = WithStrapiFields<{
  name: string;
}>;

export type FilterData = WithStrapiFields<{
  title: string;
  types: TypeData[];
}>;

export type ActivityData = WithStrapiFields<{
  name: string;
}>;

export type strapiImage = {
  id: number;
  documentId: string;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: {
      width: number;
      height: number;
      url: string;
    };
    small: {
      width: number;
      height: number;
      url: string;
    };
    large: {
      width: number;
      height: number;
      url: string;
    };
  };
};

export type LocationName = WithStrapiFields<{
  name: string;
}>;

export type AvailabilityText = {
  isAvailable: boolean;
  text: string | null;
  id: number;
};

export type FormData = {
  email: string;
  phone: string;
  StartTime: Date | null;
  EndTime: Date | null;
  Date: Date | null;
  LocationUrl?: string;
};

export type FormDataSubmit = {
  email: string;
  phone: string;
  StartTime: string;
  EndTime: string;
  Date: string;
  LocationUrl?: string;
};

export type FormOnboardData = {
  activities?: string;
  types?: string[];
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

export type LocationData = WithStrapiFields<{
  name: string;
  price: number;
  currency: string;
  address: string;
  guests: number;
  isSuperHost: boolean;
  benefit: string;
  rating: number;
  images: strapiImage[];
  logo: strapiImage;
  types: TypeData[];
  cateringAndDrinks: AvailabilityText;
  tablesAndSeating: AvailabilityText;
  alcoholicBeverages: AvailabilityText;
  restrooms: AvailabilityText;
  musicAndAV: AvailabilityText;
  allowedEvents: AvailabilityText;
  accommodation: AvailabilityText;
  parking: AvailabilityText;
  event: AvailabilityText;
  hostName: string;
  sqlft?: number;
  hour?: number;
  about?: string;
  locationImage?: strapiImage;
  policyText?: string;
  policyDaysCount?: number;
  spaceIncludes?: { text: string }[];
  pricePer?: string;
}>;
