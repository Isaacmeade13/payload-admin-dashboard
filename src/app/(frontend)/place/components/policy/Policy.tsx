'use client';

import { useBoolean } from '@/app/(frontend)/hooks/useBoolean';
import { useVenueData } from '@/app/(frontend)/hooks/useVenueData';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { useParams } from 'next/navigation';

const POLICY_CHARACTER_COUNT = 150;

function Policy() {
  const { documentId }: { documentId: string } = useParams();
  const { venue, isSuccess } = useVenueData(documentId);

  const { state: isShowMore, toggle } = useBoolean();

  if (isSuccess && venue) {
    const { policy, policyDays } = venue;

    return (
      <>
        {!!policy?.root && (
          <div className="px-4 max-xl:px-[5%] text-black">
            <h1 className="font-semibold text-2xl mt-[55px] max-lg:text-xl">
              Cancellation policy
            </h1>
            <div>
              {!!policyDays && (
                <p className="font-semibold my-[10px] text-xl max-lg:text-lg">
                  {policyDays} Days
                </p>
              )}
              <div
                className={
                  !isShowMore
                    ? 'max-h-[74px] overflow-hidden whitespace-normal break-words  max-lg:text-base'
                    : 'whitespace-normal break-words  max-lg:text-base'
                }
              >
                <RichText data={policy} />
              </div>
            </div>
            <button
              className="font-semibold text-xl underline mb-[50px] max-lg:text-lg"
              onClick={toggle}
            >
              See {isShowMore ? 'less' : 'all'}
            </button>
          </div>
        )}
      </>
    );
  }
}
export default Policy;
