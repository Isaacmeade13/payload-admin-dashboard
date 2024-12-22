import logoTitle from '../../../../assets/imgs/logoTitle.svg';
import logo from '../../../../assets/imgs/logo.svg';
import Image from 'next/image';
import SearchBar from '../searchbar/Searchbar';
import { ROUTES } from '@/utils/constants/routes';
import Link from 'next/link';
import SpaceIcon from '@/assets/imgs/space';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import BurgerIcon from '@/assets/imgs/burger';
import LinkIcon from '@/assets/imgs/link';
import ContactsIcon from '@/assets/imgs/contacts';
import clsx from 'clsx';

type HeaderProps = {
  withSearchBar?: boolean;
  withTextLogoMobile?: boolean;
  withMobileSearchBar?: boolean;
  withOutImageLogo?: boolean;
};
function Header({
  withSearchBar = true,
  withTextLogoMobile = false,
  withOutImageLogo = false,
  withMobileSearchBar = true,
}: HeaderProps) {
  return (
    <header className="bg-black  flex sticky top-0 z-[50] items-center px-[17px] sm:px-5">
      <Link href={ROUTES.home} className="flex items-center xl:justify-center">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            className={clsx('h-[66px] w-[23px] max-xl:w-[31px] mr-5', {
              'max-lg:hidden': withTextLogoMobile,
              hidden: withOutImageLogo,
            })}
          />
          <Image
            src={logoTitle}
            alt="Logo Title"
            className={clsx(
              'h-[66px] max-[450px]:h-[39px] max-[450px]:w-[220px] max-[450px]:my-[14px] mt-[4px] mb-[-4px]',
              {
                'max-lg:hidden': !withTextLogoMobile,
              },
            )}
          />
        </div>

        {withSearchBar && (
          <SearchBar withMobileSearchBar={withMobileSearchBar} />
        )}
      </Link>
      <Popover className="absolute hidden max-lg:block right-[32px] top-[10px]">
        <PopoverButton className="focus:outline-none">
          <BurgerIcon />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="min-w-52 flex flex-col !top-[57px] !left-[auto] !right-[-35px] w-[142px] h-[113px] "
        >
          <div className="bg-white flex flex-col p-[9.5px] rounded-[12px] z-[50] w-[142px] h-[113px] text-[11px] justify-evenly items-start">
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
      <div className="flex items-center ml-auto font-bold max-lg:hidden">
        <ul className="flex items-center text-sm text-white">
          <li className="mx-10">
            <a href={ROUTES.serp}>Browse Spaces</a>
          </li>
          <li>
            <a href={ROUTES.contacts}>List Your Space</a>
          </li>
        </ul>
        <Link
          href={ROUTES.contacts}
          className="flex items-center mx-10 bg-white h-fit p-1.5 text-black rounded-sm text-sm"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}

export default Header;
