'use client';

import { useState } from 'react';
import { useLocationData } from '@/app/hooks/useLocationData';

import { getArrowClasses, getDescriptionClasses } from './style';
import { createItemsWithIcons, getTitleClassName } from './helper';
import { useParams } from 'next/navigation';

function Categories() {
  const { documentId }: { documentId: string } = useParams();
  const { location, isSuccess } = useLocationData(documentId);

  const [activeId, setActiveId] = useState('');

  const toggleActive = (id: string) => {
    setActiveId((prevId) => (prevId === id ? '' : id));
  };

  if (isSuccess && location) {
    const items = createItemsWithIcons(location);

    return (
      <div className="divide-y divide-mainGrey-600 my-11 min-w-[100vh] max-xl:min-w-[auto]">
        {items.map((category) => (
          <button
            onClick={() => toggleActive(category.id)}
            key={category.id}
            className="text-justify p-6 block w-full"
          >
            <div className="flex justify-center items-center gap-[14px] max-lg:h-[20px]">
              {category.icon}
              <h1 className={getTitleClassName(category.isAvailable)}>
                {category.title}
              </h1>
              {category.isAvailable && category?.desc?.length && (
                <div
                  className={getArrowClasses(activeId === category.id)}
                ></div>
              )}
            </div>

            <div className={getDescriptionClasses(activeId === category.id)}>
              {category.desc}
            </div>
          </button>
        ))}
      </div>
    );
  }
}

export default Categories;
