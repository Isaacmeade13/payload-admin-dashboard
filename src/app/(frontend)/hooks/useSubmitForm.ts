import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { submitForm } from '@/dependencies/requests/submitForm';
import { FormDataSubmit } from '@/dependencies/types';

type UseSubmitFormType = {
  submitForm: (data: FormDataSubmit) => void;
  submitFormAsync: (data: FormDataSubmit) => Promise<any>;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
};

const useSubmitForm = (): UseSubmitFormType => {
  const mutation: UseMutationResult<any, Error, FormDataSubmit, unknown> =
    useMutation({
      mutationFn: (formData: FormDataSubmit) => submitForm(formData),
    });

  return {
    submitForm: mutation.mutate,
    submitFormAsync: mutation.mutateAsync,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error ?? null,
  };
};

export { useSubmitForm };
