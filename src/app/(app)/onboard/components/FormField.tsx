import { OnboardFormItem } from '@/dependencies/types';

interface FormFieldProps {
  item: OnboardFormItem;
  value: string;
  onChange: (name: string, value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ item, value, onChange }) => (
  <div className="w-full">
    <p className="text-[20px] font-medium mb-[20px] max-xl:text-[16px] text-black">
      {item.title}
    </p>
    {item.inputType === 'input' && (
      <input
        className="bg-mainGrey-400 w-full min-h-[61px] text-[20px] px-[17px] rounded-[6px] max-xl:text-[16px]"
        type="text"
        name={item.name}
        placeholder={item.placeholder}
        value={value}
        onChange={(e) => onChange(item.name, e.target.value)}
      />
    )}
    {item.inputType === 'textArea' && (
      <textarea
        className="bg-mainGrey-400 w-full text-[20px] p-[17px] rounded-[6px] min-h-[376px] max-xl:text-[16px] max-xl:min-h-[150px]"
        name={item.name}
        value={value}
        onChange={(e) => onChange(item.name, e.target.value)}
      ></textarea>
    )}
  </div>
);

export { FormField };
