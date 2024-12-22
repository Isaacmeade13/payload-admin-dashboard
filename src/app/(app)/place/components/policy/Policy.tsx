'use client';

import { useBoolean } from '@/app/hooks/useBoolean';
import { useLocationData } from '@/app/hooks/useLocationData';
import { useParams } from 'next/navigation';

const POLICY_CHARACTER_COUNT = 150;

function Policy() {
  const { documentId }: { documentId: string } = useParams();
  const { location, isSuccess } = useLocationData(documentId);

  const { state: isShowMore, toggle } = useBoolean();

  if (isSuccess && location) {
    const { policyText, policyDaysCount } = location;

    return (
      <>
        {!!policyText?.length && (
          <div className="px-4 max-xl:px-[5%] text-black">
            <h1 className="font-semibold text-2xl mt-[55px] max-lg:text-xl">
              Cancellation policy
            </h1>
            <div>
              {!!policyDaysCount && (
                <p className="font-semibold my-[10px] text-xl max-lg:text-lg">
                  {policyDaysCount} Days
                </p>
              )}
              <p className="whitespace-normal break-words  max-lg:text-base">
                {isShowMore
                  ? policyText
                  : policyText.slice(0, POLICY_CHARACTER_COUNT)}
              </p>
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
