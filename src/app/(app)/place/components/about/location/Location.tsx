import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useLocationData } from '@/app/hooks/useLocationData';

function Location() {
  const { documentId }: { documentId: string } = useParams();
  const { location, isSuccess } = useLocationData(documentId);

  if (isSuccess && location?.locationImage?.url) {
    const imageUrl = location.locationImage.url;
    return (
      <div className="mt-11 px-4 max-xl:px-0 mb-[5%]">
        <h1 className="text-2xl font-bold py-4 text-black max-xl:text-xl">
          Location
        </h1>
        <Image src={imageUrl} alt="location" width={1000} height={1000} />
      </div>
    );
  }
}

export default Location;
