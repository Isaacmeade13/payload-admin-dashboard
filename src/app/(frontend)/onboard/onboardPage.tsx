'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useSubmitOnboardForm } from '@/app/(frontend)/hooks/useSubmitFormOnboard';
import { useFiltersData } from '@/app/(frontend)/hooks/useFilters';
import logo from '@/assets/imgs/logo.svg';

import { FormField } from './components/FormField';
import { inputItems, inputItemsAfterCheckbox } from './constants';

import { ROUTES } from '@/utils/constants/routes';
import Link from 'next/link';

interface FormValues {
  [key: string]: string;
}

function OnboardPage() {
  const { filters } = useFiltersData();
  const { submitForm, isSuccess, isError } = useSubmitOnboardForm();

  const [formValues, setFormValues] = useState<FormValues>({});
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (documentId: number) => {
    setSelectedFilters((prevState) =>
      prevState.includes(documentId)
        ? prevState.filter((id) => id != documentId)
        : [...prevState, Number(documentId)],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...formValues,
      tags: selectedFilters,
    };
    submitForm(data);
  };

  return (
    <div className="w-full bg-custom-gradient flex items-center justify-center flex-col gap-[83px] pb-[5%] max-[450px]:gap-[40px]">
      <div className="flex items-center justify-start mt-[22px] pl-[32px] w-full">
        <Link href={ROUTES.home}>
          <Image src={logo} alt="logo" className="w-[23px] h-[32px]" />
        </Link>
      </div>
      <div className="px-[10%] w-full max-[450px]:[5%]">
        <h2 className="text-[66px] font-semibold text-white text-center max-lg:text-[40px]">
          We’re glad to have you onboard
        </h2>
        <p className="text-[20px] font-medium text-center text-white max-lg:text-[16px]">
          Please take a second to provide us with the essential details
          regarding your venue.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-[8%] rounded-[9px] gap-[30px] flex flex-col mt-[70px] max-[450px]:mt-[45px]"
        >
          {inputItems.map((item, index) => (
            <FormField
              key={index}
              item={item}
              value={formValues[item.name] || ''}
              onChange={handleInputChange}
            />
          ))}
          <p className="text-[20px] max-xl:text-[16px]">
            Tick the boxes that apply to your space.
          </p>
          <div className="pb-[100px] border-b border-mainGrey-600">
            {filters.map(({ id, title, tags }) => (
              <div
                key={id}
                className="mt-2 px-[17px] border-t border-mainGrey-600"
              >
                <h3 className="font-semibold py-4 text-black text-[22px]">
                  {title}
                </h3>
                <div className="text-[20px] max-xl:text-[16px]">
                  <fieldset>
                    <legend className="sr-only">{title}</legend>
                    <div className="grid grid-cols-2 gap-y-3.5">
                      {tags?.docs.map(({ title, id }) => (
                        <div key={id} className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id={`${id}`}
                              name={title}
                              type="checkbox"
                              checked={selectedFilters.includes(id)}
                              onChange={() => handleCheckboxChange(id)}
                              aria-describedby={`${name}-description`}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="mx-3 text-xs leading-6 max-xl:text-[10px]">
                            <label
                              htmlFor={`${id}`}
                              className="font-medium text-gray-900 text-[20px] max-xl:text-[16px]"
                            >
                              {title}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>
            ))}
          </div>

          {inputItemsAfterCheckbox.map((item, index) => (
            <FormField
              key={index}
              item={item}
              value={formValues[item.name] || ''}
              onChange={handleInputChange}
            />
          ))}
          {isSuccess && (
            <div className="w-full text-center py-5 text-green-500">
              Your enquiry has been submitted successfully!
            </div>
          )}
          {isError && (
            <div className="w-full text-center py-5 text-red-500">
              An error occurred while submitting your enquiry.
            </div>
          )}
          <button
            type="submit"
            className="bg-mainGrey-200 px-[45px] py-[21px] font-bold text-white rounded-[7px] mr-auto mt-[90px]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardPage;
