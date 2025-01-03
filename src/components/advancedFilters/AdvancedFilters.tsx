'use client';

import { TagGroupsData } from '@/dependencies/types';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useTagGroupsData } from '@/app/(frontend)/hooks/useTagGroupsData';

import XIcon from '@/assets/imgs/XIcon.svg';
import clsx from 'clsx';
interface PropType {
  open: boolean;
  setOpen: (v: boolean) => void;
  setSelectedFilterIds: Dispatch<SetStateAction<string[]>>;
  selectedFilterIds: string[];
  onSearch: () => void;
  isSuperHost: boolean;
  toggleSuperHost: () => void;
  isFlexible: boolean;
  toggleFlexible: () => void;
}

const LESS_ITEMS_COUNT = 6;

const AdvancedFilters = ({
  open,
  setOpen,
  setSelectedFilterIds,
  selectedFilterIds,
  onSearch,
  isSuperHost,
  toggleSuperHost,
  isFlexible,
  toggleFlexible,
}: PropType) => {
  const { tagGroups } = useTagGroupsData();

  const [expandedTagGroups, setExpandedTagGroups] = useState<
    Record<number, boolean>
  >({});

  const handleToggleTagGroupsExpansion = useCallback((filterId: number) => {
    setExpandedTagGroups((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  }, []);

  const canShowToggleButton = useCallback(
    (filterId: number) => {
      const filter = tagGroups.find((filter) => filter.id === filterId);
      if (!filter) return false;

      return filter?.tags?.docs.length > LESS_ITEMS_COUNT;
    },
    [tagGroups],
  );

  const getVisibleTypes = useCallback(
    (docs: TagGroupsData['tags']['docs'], itemId: number) => {
      const isExpanded = expandedTagGroups[itemId];
      return isExpanded ? docs : docs?.slice(0, LESS_ITEMS_COUNT);
    },
    [expandedTagGroups],
  );

  const onSelect = useCallback(
    (id: string) => {
      setSelectedFilterIds((prevSelectedFilterIds) => {
        if (prevSelectedFilterIds.includes(id)) {
          return prevSelectedFilterIds.filter((filterId) => filterId !== id);
        } else {
          return [...prevSelectedFilterIds, id];
        }
      });
    },
    [setSelectedFilterIds],
  );

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50 text-sm">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center sm:items-center max-xl:items-center">
          <DialogPanel
            transition
            className="relative transform overflow-y-auto max-h-[440px] bg-white mb-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:pb-0 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 max-lg:w-[80%] max-xl:rounded-[15px]"
          >
            <div>
              <DialogTitle
                as="h3"
                className="font-semibold px-[17px] leading-6 text-gray-900 border-b border-mainGrey-600 w-full sticky top-0 left-0 bg-white z-50"
              >
                <div className="flex justify-between h-[66px] items-center">
                  Filters
                  <button onClick={() => setOpen(false)}>
                    <Image src={XIcon} alt="icon" />
                  </button>
                </div>
              </DialogTitle>
              {tagGroups.map(({ id, title, tags }, i) => (
                <div
                  key={id}
                  className={clsx('px-[17px]', {
                    'mt-2 border-t border-mainGrey-600': i !== 0,
                  })}
                >
                  <h3 className="font-semibold py-4 text-black">{title}</h3>
                  <div className="text-sm">
                    <fieldset>
                      <legend className="sr-only">Filters</legend>
                      <div className="grid grid-cols-2 gap-y-3.5">
                        {getVisibleTypes(tags?.docs, id).map(
                          ({ title, id }, index) => (
                            <label
                              key={index}
                              className="relative flex items-start"
                            >
                              <div className="flex h-6 items-center">
                                <input
                                  id={`${id}`}
                                  onChange={() => onSelect(`${id}`)}
                                  name={title}
                                  checked={selectedFilterIds.includes(`${id}`)}
                                  type="checkbox"
                                  aria-describedby={`${title}-description`}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="ml-3 text-xs leading-6">
                                <div className="font-medium text-gray-900">
                                  {title}
                                </div>
                              </div>
                            </label>
                          ),
                        )}
                        {canShowToggleButton(id) && (
                          <div className="col-span-2">
                            <button
                              onClick={() => handleToggleTagGroupsExpansion(id)}
                              className="text-black font-semibold py-4 w-full max-w-[90px]"
                            >
                              {expandedTagGroups[id] ? 'Show less' : 'Show all'}
                            </button>
                          </div>
                        )}
                      </div>
                    </fieldset>
                  </div>
                </div>
              ))}
            </div>
            <fieldset>
              <div className="divide-y divide-gray-200 flex flex-col items-center justify-center gap-8 my-8">
                <label className="relative px-[17px] flex gap-[2px] items-center h-[51px] bg-mainGrey-100 text-white pl-6 rounded-[19px] max-w-[222px] max-lg:max-w-[250px] max-lg:w-[260px] max-lg:h-[55px] max-lg:px-[7px] max-lg:py-[7px]">
                  <div className="min-w-0 text-sm leading-[10.5px] flex flex-col gap-y-[1px]">
                    <div className="text-[11px] pb-[3px]">
                      Cancellation flexibility
                    </div>
                    <p id={'flexibility-description'} className="text-[7px]">
                      Only show spaces that offer cancellation flexibility.
                    </p>
                  </div>
                  <div className="flex h-6 pr-[5px] pl-[20px] ml-auto items-center">
                    <input
                      name={'flexibility'}
                      type="checkbox"
                      checked={isFlexible}
                      onChange={toggleFlexible}
                      aria-describedby={'flexibility-description'}
                      className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
                    />
                  </div>
                </label>
                <label className="relative px-[17px] flex gap-[2px] items-center h-[51px] bg-mainGrey-100 text-white pl-6 rounded-[19px] max-w-[222px] max-lg:max-w-[250px] max-lg:w-[260px] max-lg:h-[55px] max-lg:px-[7px] max-lg:py-[7px]">
                  <div className="min-w-0 text-sm leading-[10.5px] flex flex-col gap-y-[1px]">
                    <div className="text-[11px] pb-[3px]">Super Hosts</div>
                    <p id={'flexibility-description'} className="text-[7px]">
                      Super Hosts are our top picks, committed to providing the
                      best service.
                    </p>
                  </div>
                  <div className="flex h-6 pr-[5px] pl-[20px] ml-auto items-center">
                    <input
                      name={'flexibility'}
                      type="checkbox"
                      checked={isSuperHost}
                      onChange={toggleSuperHost}
                      aria-describedby={'flexibility-description'}
                      className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
                    />
                  </div>
                </label>
              </div>
            </fieldset>
            <div className="m-auto w-full pr-[17px] sticky bottom-0 flex justify-between items-center bg-white py-3 border-t border-mainGrey-600">
              <button
                type="button"
                data-autofocus
                className="mt-3 inline-flex bg-white p-2.5 px-[22px] text-sm font-semibold sm:col-start-1 sm:mt-0 text-black"
                onClick={() => setSelectedFilterIds([])}
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={onSearch}
                className="bg-mainGrey-100 text-white rounded-sm p-2 text-sm font-semibold"
              >
                View spaces
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AdvancedFilters;
