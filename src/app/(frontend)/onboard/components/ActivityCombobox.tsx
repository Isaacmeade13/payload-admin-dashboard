import { ActivityData } from '@/dependencies/types';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface ActivityComboboxProps {
  activities: ActivityData[];
  selectedActivities: ActivityData[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<ActivityData[]>>;
}

const ActivityCombobox: React.FC<ActivityComboboxProps> = ({
  activities,
  selectedActivities,
  setSelectedActivities,
}) => {
  const handleComboboxChange = (activity: ActivityData) => {
    setSelectedActivities((prevSelected) => {
      if (prevSelected.some((a) => a.id == activity?.id)) {
        return prevSelected.filter((a) => a.id != activity.id);
      } else {
        return [...prevSelected, activity];
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValues = event.target.value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const filteredActivities = activities.filter((activity) =>
      inputValues.includes(activity.title),
    );

    setSelectedActivities(filteredActivities);
  };

  return (
    <div className="w-full">
      <label className="text-[20px] font-medium max-xl:text-[16px]">
        Please list all the possible events the space can cater to. eg. meetings
        / weddings / private dining.
      </label>
      <Combobox
        as="div"
        className="w-full mt-4"
        onChange={handleComboboxChange}
      >
        <div className="relative mt-1">
          <Combobox.Input
            className="bg-mainGrey-400 w-full min-h-[61px] text-[20px] px-[17px] rounded-[6px] focus:ring-0"
            onChange={handleInputChange}
            displayValue={() => {
              const val = selectedActivities.map((a) => a?.title).join(', ');
              return val.length > 70 ? `${val.slice(0, 70)}...` : val;
            }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
          {activities.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {activities.map((activity) => (
                <Combobox.Option
                  key={activity.id}
                  value={activity}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? 'bg-mainGrey-300 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ active }) => {
                    const isSelected = selectedActivities.some(
                      (a) => a?.id === activity?.id,
                    );
                    return (
                      <>
                        <span
                          className={`block truncate ${
                            isSelected ? 'font-semibold' : ''
                          }`}
                        >
                          {activity?.title}
                        </span>
                        {isSelected && (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              active ? 'text-white' : 'text-indigo-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    );
                  }}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

interface SelectedActivitiesProps {
  selectedActivities: ActivityData[];
}

const SelectedActivities: React.FC<SelectedActivitiesProps> = ({
  selectedActivities,
}) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {selectedActivities.map((activity) => (
      <div
        key={activity.id}
        className="bg-mainGrey-400 rounded-[5px] px-[15px] py-1"
      >
        {activity?.title}
      </div>
    ))}
  </div>
);

export { ActivityCombobox, SelectedActivities };
