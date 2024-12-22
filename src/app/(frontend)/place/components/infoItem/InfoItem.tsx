import React from 'react';
import Image from 'next/image';

interface InfoItemProps {
  value: any;
  iconSrc: string;
  altText: string;
  suffixText?: string;
  prefixText?: string;
  imageFirst?: boolean;
  className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({
  value,
  iconSrc,
  altText,
  suffixText = '',
  prefixText = '',
  imageFirst = false,
  className = '',
}) => {
  if (value == null || value === '' || value === 0) return null;

  return (
    <div
      className={`flex items-center justify-center ${className} gap-[9px] max-xl:flex-[35%] max-xl:justify-start`}
    >
      <Image
        src={iconSrc}
        alt={altText}
        className="block h-[12px] w-[12px] max-xl:hidden"
      />
      {imageFirst && (
        <Image
          src={iconSrc}
          alt={altText}
          className="hidden h-[12px] w-[12px] max-xl:block"
        />
      )}
      <span className="text-[15px] max-xl:text-[13px]">
        {prefixText}
        {value}
        {suffixText}
      </span>
      {!imageFirst && (
        <Image
          src={iconSrc}
          alt={altText}
          className="hidden h-[12px] w-[12px] max-xl:block"
        />
      )}
    </div>
  );
};

export default InfoItem;
