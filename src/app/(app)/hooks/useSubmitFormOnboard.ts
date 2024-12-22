import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FormOnboardData } from '@/dependencies/types';
import { submitFormOnboard } from '@/dependencies/requests/submitFormOnboard';

type UseSubmitFormType = {
  submitForm: (data: FormOnboardData) => void;
  submitFormAsync: (data: FormOnboardData) => Promise<any>;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
};

const useSubmitOnboardForm = (): UseSubmitFormType => {
  const mutation: UseMutationResult<any, Error, FormOnboardData, unknown> =
    useMutation({
      mutationFn: (formData: FormOnboardData) => submitFormOnboard(formData),
    });

  return {
    submitForm: mutation.mutate,
    submitFormAsync: mutation.mutateAsync,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error ?? null,
  };
};

export { useSubmitOnboardForm };
