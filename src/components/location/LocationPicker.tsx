'use client';

import { useLocationNamesData } from '@/app/(frontend)/hooks/useLocationNamesData';
import { LocationName } from '@/dependencies/types';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

type LocationPickerProps = {
  setSelectedLocation: Dispatch<SetStateAction<LocationName | undefined>>;
};

const LocationPicker = ({
  setSelectedLocation,
}: LocationPickerProps): ReactElement => {
  const { locationNames } = useLocationNamesData();
  const [locationName, setLocationName] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filteredLocations =
    query === ''
      ? locationNames
      : locationNames.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase()),
        );

  const comboboxOnChange = useCallback(
    (location: string) => {
      setQuery('');
      setLocationName(location);
      const nowLocation = locationNames.find((e) => e.name === location);
      setSelectedLocation(nowLocation);
    },
    [locationNames, setSelectedLocation],
  );

  return (
    <Combobox
      as="div"
      className="w-full"
      value={locationName}
      onChange={comboboxOnChange}
    >
      <Label className="font-inter block text-xs font-bold leading-6 text-mainGrey-300 ml-[5px]">
        Location
      </Label>
      <div className="relative">
        <ComboboxInput
          className="font-inter w-full rounded-md border-0 bg-white text-gray-900 font-bold focus:ring-0 sm:text-sm sm:leading-6 placeholder-black px-[5px]"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          placeholder="Enter your location"
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        {filteredLocations.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredLocations.map((loc) => (
              <ComboboxOption
                key={loc.id}
                value={loc.name}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-mainGrey-300 data-[focus]:text-white"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {loc.name}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
};

export default LocationPicker;
