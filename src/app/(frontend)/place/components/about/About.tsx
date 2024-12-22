'use client';

import { useLocationData } from '@/app/(frontend)/hooks/useLocationData';
import { useBoolean } from '@/app/(frontend)/hooks/useBoolean';
import { useParams } from 'next/navigation';

import peopleIcon from '@/assets/imgs/people.svg';
import starIcon from '@/assets/imgs/star.svg';
import timeIcon from '@/assets/imgs/time.svg';
import sqftIcon from '@/assets/imgs/sqft.svg';
import locationIcon from '@/assets/imgs/location.svg';

import Categories from './categories/Categories';
import EnguireForm from '../form/EnquireForm';
import InfoItem from '../infoItem/InfoItem';
import Location from './location/Location';
import Image from 'next/image';

const READ_LESS_CHARACTER_COUNT = 150;
const SPACE_INCLUDE_ITEMS_COUNT = 6;

function About() {
  const { documentId }: { documentId: string } = useParams();
  const { location, isSuccess } = useLocationData(documentId);
  const { state: isReadModeAbout, toggle: toggleAbout } = useBoolean();
  const { state: isReadModeSpaceIncludes, toggle: toggleSpaceIncludes } =
    useBoolean();

  if (isSuccess && location) {
    const {
      name,
      address,
      rating,
      guests,
      hour,
      sqlft,
      about,
      spaceIncludes,
      pricePer,
    } = location;

    const spaceIncludesItems = isReadModeSpaceIncludes
      ? spaceIncludes
      : spaceIncludes!.slice(0, SPACE_INCLUDE_ITEMS_COUNT);

    return (
      <div>
        <div className="flex max-xl:flex-col max-xl:mx-[5%]">
          <div className="w-auto max-w-[900px]">
            <div className="pb-6">
              <h1 className="text-2xl font-semibold max-xl:text-base text-black">
                {name}
              </h1>
              <div className="text-mainGrey-100 py-4 max-xl:text-sm flex items-center justify-start gap-[3px]">
                <Image
                  src={locationIcon}
                  alt="Logo"
                  className="h-[20px] w-[15px] mr-[8px] max-lg:h-[15px] max-lg:w-[15px]"
                />
                {address}
              </div>
              <div className="text-sm font-semibold flex items-center justify-start gap-[9px] text-black flex-wrap">
                <InfoItem
                  value={rating}
                  iconSrc={starIcon}
                  altText="star"
                  imageFirst={true}
                />
                <InfoItem
                  value={guests}
                  suffixText=" people"
                  iconSrc={peopleIcon}
                  altText="people"
                />
                <InfoItem
                  value={hour}
                  suffixText={`${pricePer || 'hr'} minimum`}
                  iconSrc={timeIcon}
                  altText="time"
                />
                <InfoItem
                  value={sqlft}
                  suffixText=" sqft"
                  iconSrc={sqftIcon}
                  altText="sqft"
                />
              </div>
              <div className="hidden max-xl:block">
                <EnguireForm />
              </div>
            </div>
            {/* <div className="flex justify-between p-7 border-y border-y-mainGrey-600">
              <div className="flex items-center justify-start gap-[16px]">
                {logo && (
                  <Image
                    className="object-cover w-[44px] h-[44px]"
                    src={logo.url}
                    width={44}
                    height={44}
                    alt="about space"
                  />
                )}
                <span>{hostName}</span>
              </div>

              <button className="py-1 px-4 text-xs border border-black">
                See more
              </button>
            </div> */}
            {about && (
              <div className="px-3">
                <h1 className="text-xl font-bold py-4 max-lg:text-xl text-black">
                  About the space
                </h1>
                <div className="text-xl">
                  <p className="whitespace-normal break-words max-lg:text-base text-black">
                    {isReadModeAbout
                      ? about
                      : about.slice(0, READ_LESS_CHARACTER_COUNT)}
                  </p>
                </div>
                <button
                  onClick={toggleAbout}
                  className="font-semibold underline py-3 max-lg:text-base text-black"
                >
                  Read {isReadModeAbout ? 'less' : 'more'}
                </button>
              </div>
            )}
            <Categories />
            {!!spaceIncludes?.length && (
              <div className="mt-11 px-4 max-xl:px-0">
                <h1 className="text-2xl font-semibold pb-8 max-lg:text-xl text-black">
                  This space includes
                </h1>
                <div className="grid grid-cols-2 gap-6 text-xl px-4 max-lg:text-base text-black">
                  {spaceIncludesItems!.map(({ text }, index) => (
                    <div key={index}>{text}</div>
                  ))}
                </div>
                {spaceIncludes.length > SPACE_INCLUDE_ITEMS_COUNT && (
                  <button
                    onClick={toggleSpaceIncludes}
                    className="text-xl font-semibold underline mt-6 px-4"
                  >
                    See {isReadModeSpaceIncludes ? 'less' : 'all'}
                  </button>
                )}
              </div>
            )}
            <Location />
          </div>
          <div className="max-xl:hidden">
            <EnguireForm />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
