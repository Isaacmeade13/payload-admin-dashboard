/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    owner: OwnerAuthOperations;
    admin: AdminAuthOperations;
  };
  collections: {
    'venue-booking-request': VenueBookingRequest;
    'new-venue-request': NewVenueRequest;
    venue: Venue;
    'owner-profile': OwnerProfile;
    owner: Owner;
    activity: Activity;
    tag: Tag;
    'tag-group': TagGroup;
    'gallery-media': GalleryMedia;
    'logo-image': LogoImage;
    'map-image': MapImage;
    location: Location;
    currency: Currency;
    admin: Admin;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    'owner-profile': {
      venues: 'venue';
    };
    'tag-group': {
      tags: 'tag';
    };
  };
  collectionsSelect: {
    'venue-booking-request': VenueBookingRequestSelect<false> | VenueBookingRequestSelect<true>;
    'new-venue-request': NewVenueRequestSelect<false> | NewVenueRequestSelect<true>;
    venue: VenueSelect<false> | VenueSelect<true>;
    'owner-profile': OwnerProfileSelect<false> | OwnerProfileSelect<true>;
    owner: OwnerSelect<false> | OwnerSelect<true>;
    activity: ActivitySelect<false> | ActivitySelect<true>;
    tag: TagSelect<false> | TagSelect<true>;
    'tag-group': TagGroupSelect<false> | TagGroupSelect<true>;
    'gallery-media': GalleryMediaSelect<false> | GalleryMediaSelect<true>;
    'logo-image': LogoImageSelect<false> | LogoImageSelect<true>;
    'map-image': MapImageSelect<false> | MapImageSelect<true>;
    location: LocationSelect<false> | LocationSelect<true>;
    currency: CurrencySelect<false> | CurrencySelect<true>;
    admin: AdminSelect<false> | AdminSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user:
    | (Owner & {
        collection: 'owner';
      })
    | (Admin & {
        collection: 'admin';
      });
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface OwnerAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface AdminAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "venue-booking-request".
 */
export interface VenueBookingRequest {
  id: number;
  desiredVenue: number | Venue;
  date: string;
  start: string;
  end: string;
  email: string;
  phone: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "venue".
 */
export interface Venue {
  id: number;
  title: string;
  owner: number | OwnerProfile;
  isSuperHost?: boolean | null;
  isFlexible?: boolean | null;
  maxGuestsCount: number;
  price: Price;
  minBookingHours: number;
  areaSize: AreaSize;
  benefits?: string | null;
  rating: number;
  galleryImages?: (number | GalleryMedia)[] | null;
  address: string;
  tags?: (number | Tag)[] | null;
  activities?: (number | Activity)[] | null;
  cateringAndDrinks?: VenueOption;
  tablesAndSeating?: VenueOption;
  alcoholicBeverages?: VenueOption;
  restrooms?: VenueOption;
  musicAndAV?: VenueOption;
  allowedEvents?: VenueOption;
  accommodation?: VenueOption;
  parking?: VenueOption;
  event?: VenueOption;
  locations: (number | Location)[];
  map?: (number | null) | MapImage;
  /**
   * @minItems 2
   * @maxItems 2
   */
  geo?: [number, number] | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "owner-profile".
 */
export interface OwnerProfile {
  id: number;
  companyName: string;
  logo?: (number | null) | LogoImage;
  venues?: {
    docs?: (number | Venue)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "logo-image".
 */
export interface LogoImage {
  id: number;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Price".
 */
export interface Price {
  value: number;
  currency: number | Currency;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "currency".
 */
export interface Currency {
  id: number;
  name: string;
  symbol: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "AreaSize".
 */
export interface AreaSize {
  value: number;
  units: 'square-foot' | 'square-meter';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery-media".
 */
export interface GalleryMedia {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tag".
 */
export interface Tag {
  id: number;
  title: string;
  tagGroup: number | TagGroup;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tag-group".
 */
export interface TagGroup {
  id: number;
  title: string;
  tags?: {
    docs?: (number | Tag)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "activity".
 */
export interface Activity {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "VenueOption".
 */
export interface VenueOption {
  isAvailable?: boolean | null;
  additionalInfo?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "location".
 */
export interface Location {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "map-image".
 */
export interface MapImage {
  id: number;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "new-venue-request".
 */
export interface NewVenueRequest {
  id: number;
  title?: string | null;
  companyName?: string | null;
  spaceName?: string | null;
  venueDescription?: string | null;
  address?: string | null;
  activities?: string | null;
  tags: (number | Tag)[];
  cancellationPolicy?: string | null;
  minimumCancellationDuration?: string | null;
  operationalHours?: string | null;
  pricingModel?: string | null;
  seatingCapacity?: string | null;
  diningCapacity?: string | null;
  standingCapacity?: string | null;
  contactInformation?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "owner".
 */
export interface Owner {
  id: number;
  profile: number | OwnerProfile;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admin".
 */
export interface Admin {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'venue-booking-request';
        value: number | VenueBookingRequest;
      } | null)
    | ({
        relationTo: 'new-venue-request';
        value: number | NewVenueRequest;
      } | null)
    | ({
        relationTo: 'venue';
        value: number | Venue;
      } | null)
    | ({
        relationTo: 'owner-profile';
        value: number | OwnerProfile;
      } | null)
    | ({
        relationTo: 'owner';
        value: number | Owner;
      } | null)
    | ({
        relationTo: 'activity';
        value: number | Activity;
      } | null)
    | ({
        relationTo: 'tag';
        value: number | Tag;
      } | null)
    | ({
        relationTo: 'tag-group';
        value: number | TagGroup;
      } | null)
    | ({
        relationTo: 'gallery-media';
        value: number | GalleryMedia;
      } | null)
    | ({
        relationTo: 'logo-image';
        value: number | LogoImage;
      } | null)
    | ({
        relationTo: 'map-image';
        value: number | MapImage;
      } | null)
    | ({
        relationTo: 'location';
        value: number | Location;
      } | null)
    | ({
        relationTo: 'currency';
        value: number | Currency;
      } | null)
    | ({
        relationTo: 'admin';
        value: number | Admin;
      } | null);
  globalSlug?: string | null;
  user:
    | {
        relationTo: 'owner';
        value: number | Owner;
      }
    | {
        relationTo: 'admin';
        value: number | Admin;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user:
    | {
        relationTo: 'owner';
        value: number | Owner;
      }
    | {
        relationTo: 'admin';
        value: number | Admin;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "venue-booking-request_select".
 */
export interface VenueBookingRequestSelect<T extends boolean = true> {
  desiredVenue?: T;
  date?: T;
  start?: T;
  end?: T;
  email?: T;
  phone?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "new-venue-request_select".
 */
export interface NewVenueRequestSelect<T extends boolean = true> {
  title?: T;
  companyName?: T;
  spaceName?: T;
  venueDescription?: T;
  address?: T;
  activities?: T;
  tags?: T;
  cancellationPolicy?: T;
  minimumCancellationDuration?: T;
  operationalHours?: T;
  pricingModel?: T;
  seatingCapacity?: T;
  diningCapacity?: T;
  standingCapacity?: T;
  contactInformation?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "venue_select".
 */
export interface VenueSelect<T extends boolean = true> {
  title?: T;
  owner?: T;
  isSuperHost?: T;
  isFlexible?: T;
  maxGuestsCount?: T;
  price?: T | PriceSelect<T>;
  minBookingHours?: T;
  areaSize?: T | AreaSizeSelect<T>;
  benefits?: T;
  rating?: T;
  galleryImages?: T;
  address?: T;
  tags?: T;
  activities?: T;
  cateringAndDrinks?: T | VenueOptionSelect<T>;
  tablesAndSeating?: T | VenueOptionSelect<T>;
  alcoholicBeverages?: T | VenueOptionSelect<T>;
  restrooms?: T | VenueOptionSelect<T>;
  musicAndAV?: T | VenueOptionSelect<T>;
  allowedEvents?: T | VenueOptionSelect<T>;
  accommodation?: T | VenueOptionSelect<T>;
  parking?: T | VenueOptionSelect<T>;
  event?: T | VenueOptionSelect<T>;
  locations?: T;
  map?: T;
  geo?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Price_select".
 */
export interface PriceSelect<T extends boolean = true> {
  value?: T;
  currency?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "AreaSize_select".
 */
export interface AreaSizeSelect<T extends boolean = true> {
  value?: T;
  units?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "VenueOption_select".
 */
export interface VenueOptionSelect<T extends boolean = true> {
  isAvailable?: T;
  additionalInfo?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "owner-profile_select".
 */
export interface OwnerProfileSelect<T extends boolean = true> {
  companyName?: T;
  logo?: T;
  venues?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "owner_select".
 */
export interface OwnerSelect<T extends boolean = true> {
  profile?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  _verified?: T;
  _verificationToken?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "activity_select".
 */
export interface ActivitySelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tag_select".
 */
export interface TagSelect<T extends boolean = true> {
  title?: T;
  tagGroup?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tag-group_select".
 */
export interface TagGroupSelect<T extends boolean = true> {
  title?: T;
  tags?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery-media_select".
 */
export interface GalleryMediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "logo-image_select".
 */
export interface LogoImageSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "map-image_select".
 */
export interface MapImageSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "location_select".
 */
export interface LocationSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "currency_select".
 */
export interface CurrencySelect<T extends boolean = true> {
  name?: T;
  symbol?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admin_select".
 */
export interface AdminSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}