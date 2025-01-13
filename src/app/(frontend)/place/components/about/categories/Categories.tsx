'use client';

import { useState } from 'react';
import { useVenueData } from '@/app/(frontend)/hooks/useVenueData';

import { getArrowClasses, getDescriptionClasses } from './style';
import { createItemsWithIcons, getTitleClassName } from './helper';
import { useParams } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';

function Categories() {
  const { documentId }: { documentId: string } = useParams();
  const { venue, isSuccess } = useVenueData(documentId);

  const [activeId, setActiveId] = useState('');

  const toggleActive = (id: string) => {
    setActiveId((prevId) => (prevId === id ? '' : id));
  };

  if (isSuccess && venue) {
    const items = createItemsWithIcons(venue);

    return (
      <div className="divide-y divide-mainGrey-600 my-11 max-xl:min-w-[auto] max-w-[880px]">
        {items.map((category) => {
          const hasDescription = !!category?.desc?.root;
          return (
            <button
              disabled={!hasDescription}
              onClick={
                hasDescription ? () => toggleActive(category.id) : undefined
              }
              key={category.id}
              className="text-justify p-6 block w-full"
            >
              <div className="flex justify-center items-center gap-[14px] max-lg:h-[20px]">
                {category.icon}
                <h1 className={getTitleClassName(category.isAvailable)}>
                  {category.title}
                </h1>
                {category.isAvailable && category?.desc?.root && (
                  <div
                    className={getArrowClasses(activeId === category.id)}
                  ></div>
                )}
              </div>
              <RichText
                className={getDescriptionClasses(activeId === category.id)}
                data={category.desc}
              />
            </button>
          );
        })}
      </div>
    );
  }
}

export default Categories;
