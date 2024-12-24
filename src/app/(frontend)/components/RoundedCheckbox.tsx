import React from 'react';
import { Checkbox } from '@headlessui/react';

interface RoundedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

const RoundedCheckbox: React.FC<RoundedCheckboxProps> = ({
  checked,
  onChange,
  className = '',
  children,
}) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div
      className={`flex items-center gap-[13px] cursor-pointer ${className}`}
      onClick={handleToggle}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="group block size-4 rounded-full p-[1.5px] border bg-white 
                   data-[checked]:bg-gray-500 
                   data-[disabled]:cursor-not-allowed 
                   data-[disabled]:opacity-50 
                   data-[checked]:data-[disabled]:bg-gray-500"
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100 transition-opacity duration-200"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      {children && <span>{children}</span>}
    </div>
  );
};

export default RoundedCheckbox;
