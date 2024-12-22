import { OnboardFormItem } from '@/dependencies/types';

export const inputItems: OnboardFormItem[] = [
  {
    title: 'The name of the company / group that manages the venue.',
    inputType: 'input',
    name: 'companyName',
  },
  {
    title: 'Name of the space.',
    inputType: 'input',
    name: 'spaceName',
  },
  {
    title: 'Full address of the venue.',
    placeholder: 'eg. 1 Kensington court, London, W8 5DL',
    inputType: 'input',
    name: 'address',
  },
  {
    title: 'Standing capacity.',
    inputType: 'input',
    name: 'standingCapacity',
  },
  {
    title: 'Seating capacity.',
    inputType: 'input',
    name: 'seatingCapacity',
  },
  {
    title: 'Dining capacity.',
    inputType: 'input',
    name: 'diningCapacity',
  },
  {
    title:
      'Please write a brief description of the venue. (will be referenced description on the live page)',
    inputType: 'textArea',
    name: 'venueDescription',
  },
  {
    title:
      'Please explain the pricing model for your venue. Include whether the rates are based on an hourly, daily, per-person fee or if there is a minimum spend.',
    inputType: 'textArea',
    name: 'pricingModel',
  },
  {
    title: 'Operational hours',
    inputType: 'textArea',
    name: 'operationalHours',
  },
  {
    title:
      'Please list all the possible events the space can cater to. eg. meetings / weddings / private dining.',
    inputType: 'textArea',
    name: 'activities',
  },
];

export const inputItemsAfterCheckbox: OnboardFormItem[] = [
  {
    title: 'Minimum cancellation duration',
    inputType: 'input',
    name: 'minimumCancellationDuration',
  },
  {
    title: 'Mention briefly your cancellation policy.',
    inputType: 'textArea',
    name: 'cancellationPolicy',
  },
  {
    title:
      'Please leave the information for the best point of contact regarding the space. Format - name, company, position, email, mobile number.',
    inputType: 'textArea',
    name: 'contactInformation',
  },
];
