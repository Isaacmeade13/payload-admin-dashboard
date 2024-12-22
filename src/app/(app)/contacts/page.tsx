import Image from 'next/image';
import logoTitle from '@/assets/imgs/logoTitle.svg';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants/routes';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us via email or phone.',
};

export const dynamic = 'force-static';
function Contacts() {
  return (
    <div className="h-screen w-full bg-custom-gradient flex items-center justify-center flex-col gap-[83px]">
      <Link href={ROUTES.home}>
        <Image
          src={logoTitle}
          alt="Logo Title"
          className="w-[255px] pb-[89px]"
        />
      </Link>
      <p className="font-normal text-white">
        For all enquiries please see contact details below.
      </p>
      <a
        href="mailto:sales@eventcage.com"
        className="font-normal text-white hover:underline"
      >
        sales@eventcage.com
      </a>
      <a
        href="tel:+03330908750"
        className="font-normal text-white hover:underline"
      >
        0333 090 8750
      </a>
    </div>
  );
}

export default Contacts;
