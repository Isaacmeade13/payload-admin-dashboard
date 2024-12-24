'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLocationData } from '@/app/(frontend)/hooks/useLocationData';

import Carousel from './Carousel';
import { getImageClasses, getPosition } from './helper';
import { useParams } from 'next/navigation';

const MAX_GALLERY_ITEMS = 4;

function Gallery() {
  const { documentId }: { documentId: string } = useParams();
  const { location, isSuccess } = useLocationData(documentId);

  const [openCarousel, setOpenCarousel] = useState(false);

  if (isSuccess && location) {
    const { galleryImages } = location;

    const showedImages = galleryImages?.slice(0, MAX_GALLERY_ITEMS);
    const imageCount = showedImages?.length;

    return (
      <>
        <div className="grid gap-1 grid-cols-5 grid-rows-2 mb-8 h-[471px] relative max-xl:grid-cols-1 max-xl:grid-rows-1 max-[450px]:h-[326px]">
          {showedImages?.map((img, index) => {
            const isBlurred = imageCount > 1 && index + 1 === imageCount;
            const pos = getPosition(index, imageCount);
            return (
              <button
                key={img.id}
                onClick={() => setOpenCarousel(true)}
                className={getImageClasses(pos, isBlurred, index)}
              >
                <Image
                  src={img.url}
                  width={2000}
                  height={2000}
                  alt="gallery img1"
                  className={getImageClasses(pos, isBlurred, index)}
                />
              </button>
            );
          })}
          {galleryImages.length > 1 && (
            <button
              onClick={() => setOpenCarousel(true)}
              className="absolute right-0 bottom-0 m-8 p-2 max-w-[100px] bg-mainGrey-100 text-white text-xs font-semibold max-xl:hidden"
            >
              View all {galleryImages?.length} photos
            </button>
          )}
          {galleryImages.length > 1 && (
            <button
              onClick={() => setOpenCarousel(true)}
              className="hidden absolute right-[11px] bottom-[11px] p-2 max-w-[100px] bg-mainGrey-100 text-white text-xs font-semibold max-xl:block bg-opacity-10 rounded-[5px]"
            >
              1 / {galleryImages.length}
            </button>
          )}
        </div>

        <Carousel
          imageSrcs={galleryImages}
          open={openCarousel}
          setOpen={setOpenCarousel}
        />
      </>
    );
  }
}

export default Gallery;
