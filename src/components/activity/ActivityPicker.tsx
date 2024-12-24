'use client';

import { useActivities } from '@/app/(frontend)/hooks/useActivities';
import { WithStrapiFields } from '@/dependencies/types';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Dispatch, SetStateAction, useState } from 'react';

type ActivityPickerProps = {
  selectedActivity:
    | WithStrapiFields<{
        title: string;
      }>
    | undefined;
  setSelectedActivity: Dispatch<
    SetStateAction<
      | WithStrapiFields<{
          title: string;
        }>
      | undefined
    >
  >;
};
function ActivityPicker({
  selectedActivity,
  setSelectedActivity,
}: ActivityPickerProps) {
  const { activities } = useActivities();
  const [query, setQuery] = useState('');

  const filteredActivities =
    query === ''
      ? activities
      : activities.filter((activity) => {
          return activity.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      className="w-full"
      value={selectedActivity?.title}
      onChange={(activity) => {
        setQuery('');
        const newActivity = activities.find((act) => act.title === activity);
        if (newActivity) {
          setSelectedActivity(newActivity);
        }
      }}
    >
      <Label className="font-inter font-bold block text-xs leading-6 text-mainGrey-300 ml-[5px]">
        What are you planning?
      </Label>
      <div className="relative">
        <ComboboxInput
          className="font-inter w-full rounded-md border-0 bg-white text-gray-900 font-bold focus:ring-0 sm:text-sm sm:leading-6 placeholder-black px-[5px]"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          placeholder="Enter your activity"
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none focus:ring-0">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        {filteredActivities.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredActivities.map((activity) => (
              <ComboboxOption
                key={activity.id}
                value={activity.title}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-mainGrey-300 data-[focus]:text-white"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {activity.title}
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
}

export default ActivityPicker;
