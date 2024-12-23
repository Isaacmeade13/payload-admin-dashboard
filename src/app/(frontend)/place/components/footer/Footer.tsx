import Image from 'next/image';
import logo from '../../../../../assets/imgs/logo.svg';
import inst from '../../../../../assets/imgs/shared/instagram.svg';

import linkedin from '../../../../../assets/imgs/shared/linkedin.svg';
import tiktok from '../../../../../assets/imgs/shared/tiktok.svg';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants/routes';

function Footer() {
  return (
    <footer className="bg-black py-11 px-24 max-xl:p-[5%]">
      <div className="flex align-bottom pb-14 border-b border-white max-xl:justify-between max-xl:pb-[2%]">
        <Image src={logo} alt="logo" className="w-[120px] max-xl:w-[5vh]" />
        <ul className="grid grid-cols-4 content-end align-center text-center text-white w-full max-md:grid-cols-1 max-md:grid-rows-5 max-xl:gap-[5px] max-xl:text-xs">
          {/* <li>
            <a href="">About</a>
          </li> */}
          <li>
            <Link className="font-courier" href={ROUTES.agreement}>
              Terms
            </Link>
          </li>
          <li>
            <Link className="font-courier" href={ROUTES.policy}>
              Privacy
            </Link>
          </li>
          <li>
            <Link className="font-courier" href={ROUTES.contacts}>
              List Your Space
            </Link>
          </li>
          <li>
            <Link className="font-courier" href={ROUTES.contacts}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex justify-end">
          <li className=" py-5 px-3">
            <a
              href=""
              className="block h-[35px] w-[35px] p-[4px] max-xl:h-[25px] max-xl:w-[25px]"
            >
              <Image src={inst} alt="instagram" />
            </a>
          </li>
          <li className=" py-5 px-3">
            <a
              href=""
              className="block h-[35px] w-[35px] max-xl:h-[25px] max-xl:w-[25px]"
            >
              <Image src={linkedin} alt="linkedin" />
            </a>
          </li>
          <li className=" py-5 px-3">
            <a
              href=""
              className="block h-[35px] w-[35px] max-xl:h-[25px] max-xl:w-[25px]"
            >
              <Image src={tiktok} alt="tiktok" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
