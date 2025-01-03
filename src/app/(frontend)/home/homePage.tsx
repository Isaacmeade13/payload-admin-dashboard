'use client';

import Image from 'next/image';

import LocationPicker from '@/components/location/LocationPicker';
import ActivityPicker from '@/components/activity/ActivityPicker';
import GuestsPicker from '@/components/guests/GuestsPicker';
import AdvancedFilters from '@/components/advancedFilters/AdvancedFilters';
import backgroundImg from '@/assets/imgs/background.png';
import logoTitle from '@/assets/imgs/logoTitle.svg';
import { useBoolean } from '@/app/(frontend)/hooks/useBoolean';
import { ROUTES } from '@/utils/constants/routes';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocationName, WithPayloadFields } from '@/dependencies/types';
import { generateSearchUrl } from '@/utils/generateSearchUrl';
import Link from 'next/link';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import BurgerIcon from '@/assets/imgs/burger';
import LinkIcon from '@/assets/imgs/link';
import SpaceIcon from '@/assets/imgs/space';
import ContactsIcon from '@/assets/imgs/contacts';
import arrowRightIcon from '@/assets/imgs/arrow-right.svg';

function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<
    LocationName | undefined
  >(undefined);
  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    WithPayloadFields<{ title: string }> | undefined
  >();

  const router = useRouter();

  const {
    state: isOpenFilters,
    setFalse: closeFilters,
    setTrue: openFilters,
  } = useBoolean();

  const { state: isSuperHost, toggle: toggleSuperHost } = useBoolean();
  const { state: isFlexible, toggle: toggleFlexible } = useBoolean();

  const onSearch = useCallback(() => {
    const url = generateSearchUrl({
      selectedLocation: selectedLocation?.id,
      selectedActivity: selectedActivity?.id,
      selectedFilterIds,
      isSuperHost,
      isFlexible,

      // DISABLE FILTERING BY GUEST COUNT
      // selectedGuestCount,
    });
    router.push(url);
  }, [
    isFlexible,
    isSuperHost,
    router,
    selectedFilterIds,
    selectedLocation,
    selectedActivity,
  ]);

  return (
    <div className="grid min-h-screen bg-background-gradient">
      <header className="absolute top-0 z-[11] flex items-center text-white font-bold w-full px-16 h-[90px] justify-center ">
        <Popover className="absolute hidden max-lg:block left-[32px] top-[50px]">
          <PopoverButton className="focus:outline-none">
            <BurgerIcon />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col !top-[57px] !left-[31px]"
          >
            <div className="bg-white flex flex-col p-[9.5px] rounded-[12px] z-[99] w-[142px] h-[113px] text-[11px] justify-evenly items-start">
              <a href={ROUTES.contacts}>
                <div className="flex items-center justify-center gap-[11.5px]">
                  <LinkIcon color="black" />
                  <div className="border-b border-b-[#ECECEC]">
                    List Your Space
                  </div>
                </div>
              </a>
              <a href={ROUTES.contacts}>
                <div className="flex items-center justify-center gap-[14.5px]">
                  <ContactsIcon color="black" />
                  <div className="border-b border-b-[#ECECEC]">Contact us</div>
                </div>
              </a>
              <a href={ROUTES.serp}>
                <div className="flex items-center justify-center gap-[11.5px]">
                  <SpaceIcon color="black" />
                  Browse spaces
                </div>
              </a>
            </div>
          </PopoverPanel>
        </Popover>
        <Image
          src={logoTitle}
          alt="Logo Title"
          className="max-lg:mt-[65px] w-[220px] h-[39px] max-[370px]:w-[170px]"
        />
        <ul className="flex items-center ml-auto text-sm max-lg:hidden">
          <li className="mx-10">
            <a
              href={ROUTES.serp}
              className="flex items-center justify-center gap-[7px]"
            >
              Browse Spaces
              <SpaceIcon />
            </a>
          </li>
          <li>
            <a
              href={ROUTES.contacts}
              className="flex items-center justify-center gap-[7px]"
            >
              List Your Space
              <LinkIcon />
            </a>
          </li>
        </ul>
        <Link
          className="flex items-center mx-10 bg-white h-fit p-1.5 text-black rounded-sm text-sm  max-lg:hidden"
          href={ROUTES.contacts}
        >
          Contact Us
        </Link>
      </header>
      <main className="flex items-center">
        <div className="absolute top-0 w-full opacity-75 h-[80vh] bg-black" />
        <Image
          className="absolute top-0 w-full opacity-70 h-[90vh] lg:h-[80vh] object-cover"
          src={backgroundImg}
          alt="Background City"
        />
        <div className="z-10 w-full flex justify-center items-center flex-col max-sm:mb-[40%]">
          <div className="flex gap-4 justify-between items-center bg-white rounded-sm w-[800px] h-[65px] text-sm p-[10px] max-lg:h-auto  max-lg:flex-col max-lg:rounded-[15px] max-lg:p-[10px] max-lg:max-w-[71%] max-[450px]:max-h-[240px] max-lg:w-full ">
            <div className="flex items-start justify-center w-full">
              <ActivityPicker
                selectedActivity={selectedActivity}
                setSelectedActivity={setSelectedActivity}
              />
            </div>
            <div className="flex items-start justify-center max-lg:border-t max-xl:border-mainGrey-600  w-full">
              <LocationPicker setSelectedLocation={setSelectedLocation} />
            </div>
            <div className="flex items-start justify-center max-lg:border-t max-xl:border-mainGrey-600  w-full">
              <GuestsPicker />
            </div>

            <div
              onClick={onSearch}
              className="flex items-center justify-end h-full"
            >
              <button className="font-bold font-inter bg-mainGrey-100 text-white rounded-sm p-2 text-base h-[44px] flex items-center justify-center min-w-[119px] gap-[8px]">
                Search
                <Image
                  src={arrowRightIcon}
                  alt="left_arrow"
                  width={19}
                  height={19}
                />
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4 text-orange tracking-[1.1px] font-medium">
            <button onClick={openFilters}>use our more advanced filter</button>
          </div>
          <AdvancedFilters
            setSelectedFilterIds={setSelectedFilterIds}
            selectedFilterIds={selectedFilterIds}
            open={isOpenFilters}
            setOpen={closeFilters}
            onSearch={onSearch}
            isSuperHost={isSuperHost}
            toggleSuperHost={toggleSuperHost}
            isFlexible={isFlexible}
            toggleFlexible={toggleFlexible}
          />
        </div>
      </main>
      <div className="absolute font-poppins text-7xl text-white font-bold max-lg:text-4xl top-[83vh] lg:top-[75vh] sm:px-16 px-5 max-[450px]:[11rem] max-[355px]:text-[30px]">
        <div>Find</div>
        <div>The Perfect Spot.</div>
      </div>
      <div className="absolute font-courier font-extrabold text-[11px] text-white top-[calc(83vh_+_90px)] lg:bottom-[119px] right-[15px]">
        Canary Wharf - LDN
      </div>
    </div>
  );
}

export default HomePage;
