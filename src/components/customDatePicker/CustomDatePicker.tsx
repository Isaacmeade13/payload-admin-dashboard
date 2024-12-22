import clsx from 'clsx';
import React, { forwardRef, createElement } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({
  value,
  onChange,
  placeholder,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}) => {
  const CustomInput = forwardRef<
    HTMLDivElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      className="flex items-center cursor-pointer mb-4 py-3.5 px-5 border border-mainGrey-600 placeholder:text-gray-400 max-xl:text-base"
    >
      <span
        className={clsx('flex-grow', {
          'text-black': !value,
          'text-gray-500': !value,
        })}
      >
        {value || placeholder || 'Start date'}
      </span>
      <span className="ml-2 w-3 h-3 border-b border-r border-mainGrey-500 transform rotate-45"></span>
    </div>
  ));

  CustomInput.displayName = 'CustomInput';

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDay()}`;
  };

  return (
    <DatePicker
      className="w-full"
      wrapperClassName="w-full"
      selected={value}
      onChange={onChange}
      dateFormat="MMMM d"
      customInput={createElement(CustomInput, {
        value: value ? formatDate(value) : '',
      })}
    />
  );
};

export { CustomDatePicker };
