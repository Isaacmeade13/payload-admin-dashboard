import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { strapiImage } from '@/dependencies/types';

interface PropTypes {
  open: boolean;
  imageSrcs: strapiImage[];
  setOpen: (val: boolean) => void;
}

function Carousel({ open, setOpen, imageSrcs }: PropTypes) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === imageSrcs.length - 1 ? 0 : prev + 1));
  }, [imageSrcs.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? imageSrcs.length - 1 : prev - 1));
  }, [imageSrcs.length]);

  return (
    <Dialog open={open} onClose={setOpen} className="z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 max-xl:items-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden bg-white px-10 p-10 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:w-2/3 w-full h-2/3 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 max-xl:p-6"
          >
            <div className="max-w-1/2 flex items-center justify-center">
              <button
                className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] border-l-black border-b-black border-l border-b cursor-pointer rotate-45 max-xl:min-w-[13px] max-xl:min-h-[13px] max-xl:w-[13px] max-xl:h-[13px]"
                onClick={handlePrev}
              ></button>
              <Image
                src={imageSrcs[currentIndex]?.url}
                width={1000}
                height={1000}
                alt=""
                className="w-full"
              />
              <button
                className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] border-r-black border-t-black border-r border-t cursor-pointer rotate-45 max-xl:min-w-[13px] max-xl:min-h-[13px] max-xl:w-[13px] max-xl:h-[13px]"
                onClick={handleNext}
              ></button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Carousel;
