import Image from 'next/image';
import { LocationData } from '@/dependencies/types';
import { ROUTES } from '@/utils/constants/routes';
import Link from 'next/link';
import arrowRightIcon from '@/assets/imgs/arrow-right.svg';
import arrowLeftIcon from '@/assets/imgs/arrow-left.svg';

import { useCallback, useState } from 'react';
import Address from './Address';
import { truncateText } from '@/utils/truncateText';
import { useSearchParams } from 'next/navigation';

type SerpItemProps = {
  location: LocationData;
};

const MAX_BENEFIT_LENGTH = 100;

function SerpItem({ location }: SerpItemProps) {
  const { isSuperHost, price, benefits, maxGuestsCount, galleryImages } =
    location;
  const [imageIndex, setImageIndex] = useState(0);
  const placeRoute = `${ROUTES.place}/${location.id}`;
  const imageSrc = galleryImages?.[imageIndex]?.url;
  const isButtonsActive = galleryImages?.length > 1;
  const searchParams = useSearchParams();
  const currentQuery = Object.fromEntries(searchParams.entries());
  const handleNext = useCallback(() => {
    if (imageIndex + 1 < galleryImages?.length) {
      return setImageIndex((prev) => prev + 1);
    }
    setImageIndex(0);
  }, [imageIndex, galleryImages?.length]);

  const handlePrev = useCallback(() => {
    if (imageIndex === 0) {
      const lastIndex = galleryImages?.length - 1;
      return setImageIndex(lastIndex);
    }
    setImageIndex((prev) => prev - 1);
  }, [imageIndex, galleryImages?.length]);

  return (
    <div className="flex flex-col max-lg:border-b max-lg:border-mainGrey-600 max-lg:pb-[22px] p-0 max-lg:p-6">
      <div className="flex max-lg:flex-col max-lg:relative">
        <div className="min-w-[317px] w-[317px] h-[228px] relative max-lg:w-full max-lg:max-h-[392px]">
          {imageSrc && (
            <>
              {isButtonsActive && (
                <button
                  onClick={handleNext}
                  className="w-[29px] h-[29px] bg-opacity-20 bg-mainGrey-100 absolute top-[114px] left-[11px] z-[8] rounded-[50%] p-[4px]"
                >
                  <Image
                    src={arrowLeftIcon}
                    alt="left_arrow"
                    width={21}
                    height={21}
                  />
                </button>
              )}
              <Link
                href={{
                  pathname: placeRoute,
                  query: currentQuery,
                }}
              >
                <Image
                  src={imageSrc}
                  alt="item_img"
                  width={320}
                  height={220}
                  className="w-full h-full rounded-md object-cover"
                />
              </Link>
              {isButtonsActive && (
                <button
                  onClick={handlePrev}
                  className="w-[29px] h-[29px] bg-opacity-20 bg-mainGrey-100  absolute top-[114px] right-[11px] z-[8] rounded-[50%] p-[4px]"
                >
                  <Image
                    src={arrowRightIcon}
                    alt="right_arrow"
                    width={21}
                    height={21}
                  />
                </button>
              )}
            </>
          )}
          {isSuperHost && (
            <span className="absolute top-4 left-3.5 bg-white py-1.5 text-sm text-mainGrey-100 font-semibold rounded-2xl px-3 max-lg:hidden">
              Super Host
            </span>
          )}
          <span className="absolute bottom-4 right-3.5 rounded-xl px-3 bg-mainGrey-100 py-2 text-sm text-white font-semibold ">
            from {price?.currency?.symbol}
            {price.value}/{price?.per || 'hr'}
          </span>
        </div>
        <div className="h-[228px] px-6 max-lg:px-0 max-lg:h-auto w-full">
          {benefits && (
            <div className="p-3.5 mt-3 max-w-[333px] max-h-[100px] h-fit border border-mainGrey-600 rounded-md text-center max-lg:absolute max-lg:top-[13px] max-lg:left-[13px] max-lg:bg-white max-lg:max-h-[66px] max-lg:w-[224px] overflow-hidden shadow-lg mb-[24px]">
              <h1 className="text-mainGrey-100 font-semibold max-lg:text-[9px]">
                Benefits with Eventcage!
              </h1>
              <p className="text-xs max-lg:text-[8px]">
                {truncateText(benefits, MAX_BENEFIT_LENGTH)}
              </p>
            </div>
          )}
          <div className="hidden max-lg:block py-[19px]">
            <Address location={location} />
          </div>
          <div className="flex justify-between divide-x divide-mainGrey-600 text-mainGrey-100 font-semibold text-center max-lg:justify-between flex-wrap gap-y-2">
            <div className="h-fit p-5 max-lg:bg-mainGrey-100 max-lg:text-white max-lg:rounded-[23px] max-lg:h-[21px] max-lg:flex max-lg:items-center max-lg:justify-center max-lg:text-[13px] max-lg:py-[2px] max-lg:px-[10px] max-[380px]:px-[7px] max-[380px]:text-[10px]">
              From {price?.currency?.symbol}
              {price?.value}/{price?.per || 'hr'}
            </div>
            {!!maxGuestsCount && (
              <>
                <div className="max-lg:hidden" />
                <div className="h-fit p-5 border-none max-lg:bg-mainGrey-100 max-lg:text-white max-lg:rounded-[23px] max-lg:h-[21px] max-lg:flex max-lg:items-center max-lg:justify-center max-lg:text-[13px] max-lg:py-[2px] max-lg:px-[10px] max-[380px]:px-[7px] max-[380px]:text-[10px]">
                  Fits {maxGuestsCount}{' '}
                  {maxGuestsCount > 1 ? 'guests' : 'guest'}
                </div>
              </>
            )}
            {isSuperHost && (
              <>
                <div className="max-lg:hidden" />
                <div className="h-fit border-none p-5 max-lg:bg-mainGrey-100 max-lg:text-white max-lg:rounded-[23px] max-lg:h-[21px] max-lg:flex max-lg:items-center max-lg:justify-center max-lg:text-[13px] max-lg:py-[2px] max-lg:px-[10px] max-[380px]:px-[7px] max-[380px]:text-[10px]">
                  Super host
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="max-lg:hidden py-5">
        <Address location={location} />
      </div>
      <Link
        href={{
          pathname: placeRoute,
          query: currentQuery,
        }}
        className="block w-fit mx-auto font-bold underline text-mainGrey-100 max-lg:hidden"
      >
        See More
      </Link>
    </div>
  );
}

export default SerpItem;
