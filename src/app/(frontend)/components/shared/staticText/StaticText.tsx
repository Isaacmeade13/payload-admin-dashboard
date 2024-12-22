import Image from 'next/image';
import blackBgIcon from '@/assets/imgs/blackBgIcon.png';

type StaticTextProps = {
  title: string;
  text: string;
};

function StaticText({ title, text }: StaticTextProps) {
  return (
    <div className="px-[11%] mb-[10%] relative max-xl:px-[15%] ">
      <h1 className="font-extrabold text-4xl mt-[42px] mb-[50px] text-center max-xl:text-2xl text-black">
        {title}
      </h1>
      <p className="font-bold text-lg whitespace-pre-wrap max-xl:text-base">
        {text}
      </p>
      <Image
        src={blackBgIcon}
        alt="icon"
        className="absolute top-[907px] left-[58px] w-[42px] h-[49px] max-xl:w-[5vh] max-xl:h-auto max-xl:left-[2%]"
        width={49}
        height={49}
      />
    </div>
  );
}

export { StaticText };
