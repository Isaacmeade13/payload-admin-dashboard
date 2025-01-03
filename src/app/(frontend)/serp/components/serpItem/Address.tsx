import Image from 'next/image';
import { VenueData } from '@/dependencies/types';
import locationIcon from '@/assets/imgs/location.svg';

import starIcon from '@/assets/imgs/star.svg';

type AddressProps = {
  location: VenueData;
};

function Address({ location }: AddressProps) {
  const { address, rating, title } = location;

  return (
    <div className="flex flex-wrap flex-col max-lg:flex-col max-lg:items-start max-lg:justify-center">
      <div className="flex items-center justify-start gap-[12px]">
        <h1 className="font-semibold max-lg:text-[15px]">{title}</h1>
        {!!rating && (
          <div className="hidden items-center justify-center gap-[3px] max-lg:flex">
            <Image src={starIcon} alt="Logo" className="h-[20px] w-[20px]" />
            <p className="text-black font-semibold max-lg:text-[12px]">
              {rating}
            </p>
          </div>
        )}
      </div>
      <div className="text-mainGrey-100 flex gap-[9px] justify-center items-center w-fit">
        {!!rating && (
          <div className="flex items-center justify-center gap-[3px] max-lg:hidden">
            <Image src={starIcon} alt="Logo" className="h-[20px] w-[20px]" />
            <p className="text-black font-semibold max-lg:text-[12px]">
              {rating}
            </p>
          </div>
        )}
        <div className="flex items-center justify-center gap-[3px] gap-x-[8px]">
          <Image
            src={locationIcon}
            alt="Logo"
            className="h-[20px] w-[15px] max-lg:h-[15px] max-lg:w-[15px]"
          />
          <p className="text-[14px]">{address}</p>
        </div>
      </div>
    </div>
  );
}

export default Address;
