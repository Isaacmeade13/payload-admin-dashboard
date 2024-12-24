'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'next/navigation';

import { useLocationData } from '@/app/(frontend)/hooks/useLocationData';
import { useSubmitForm } from '@/app/(frontend)/hooks/useSubmitForm';
import { CustomDatePicker } from '@/components/customDatePicker/CustomDatePicker';
import { CustomTimePicker } from '@/components/customTimePicker/CustomTimePicker';
import { FormData } from '@/dependencies/types';

import calendarIcon from '@/assets/imgs/calendar.svg';
import Image from 'next/image';

function EnguireForm() {
  const [formData, setFormData] = useState<FormData>({
    date: null,
    start: null,
    end: null,
    email: '',
    phone: '',
  });

  const { submitForm, isSuccess, isError } = useSubmitForm();
  const { documentId }: { documentId: string } = useParams();
  const { location } = useLocationData(documentId);

  const hour = location?.minBookingHours;
  const price = location?.price.value;
  const currency = location?.price?.currency?.symbol;
  const pricePer = location?.price.per || 'hr';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitForm({
      ...formData,
      desiredVenue: location!.id,
    });
  };

  return (
    <div className="min-w-[417px] ml-11 h-[636px] border border-mainGrey-600 max-xl:ml-0 max-lg:mt-[26px] max-xl:min-w-[auto]">
      <div className="text-center py-9 border-b border-mainGrey-600">
        <h1 className="text-4xl font-bold max-lg:text-[32px] text-black">
          from {currency}
          {price} / {pricePer}
        </h1>
        {!!hour && <h3 className="text-sm font-semibold">{hour} hr minimum</h3>}
      </div>
      <div className="text-xl px-6">
        <h3 className="font-bold py-5 max-xl:text-base text-black flex items-center justify-start gap-[2px]">
          Date and time*
          <Image src={calendarIcon} alt="calendar-icon" />
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <CustomDatePicker
            value={formData?.date}
            onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
          />
          <div className="mb-4 flex justify-between items-center">
            <CustomTimePicker
              value={formData?.start}
              onChange={(start: Date | null) =>
                setFormData((prev) => ({ ...prev, start }))
              }
              placeholder="Start time"
            />
            <CustomTimePicker
              value={formData?.end}
              onChange={(end: Date | null) =>
                setFormData((prev) => ({ ...prev, end }))
              }
              placeholder="End time"
            />
          </div>
          <input
            id="email"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full mb-4 py-3.5 px-5 border border-mainGrey-600 placeholder:text-gray-400 max-xl:text-base"
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="w-full mb-4 py-3.5 px-5 border border-mainGrey-600 placeholder:text-gray-400 max-xl:text-base"
          ></input>
          <button
            type="submit"
            className="w-full text-white text-2xl font-bold bg-mainGrey-100 py-3.5 max-xl:text-lg"
          >
            enquire now
          </button>
        </form>
      </div>
      {isSuccess && (
        <div className="w-full text-center py-5 text-green-500 max-xl:text-lg">
          Your enquiry has been submitted successfully!
        </div>
      )}
      {isError && (
        <div className="w-full text-center py-5 text-red-500 max-xl:text-lg">
          An error occurred while submitting your enquiry.
        </div>
      )}

      <div className="w-full text-center py-5 text-mainGrey-100 underline max-xl:text-lg">
        expect a response within 1 hour
      </div>
    </div>
  );
}

export default EnguireForm;
