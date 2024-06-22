import { useState, useCallback, useEffect, useRef } from 'react';

type ValidationErrors<T> = {
  [K in keyof T]?: (value: T) => string | undefined;
};

interface RadFormProps<T> {
  initialValues: T;
  validate: ValidationErrors<T>;
}

interface RadFormReturn<T> {
  handleChange: (field: keyof T, value: any) => void;
  handleSubmit: (callback: (values: T) => Promise<void>) => Promise<void>;
  resetForm: () => void;
  values: T;
  isLoading: boolean;
  errors: Partial<Record<keyof T, string>>;
}

/**
 * Custom hook to handle form state and validation.
 *
 * @param Object - An object containing the initial values and validation objects.
 * @returns The form handlers, values, loading state, and errors.
 *
 * @example
 * const { handleChange, handleSubmit, resetForm, values, isLoading, errors } = useRadForm({
 *   initialValues: {
 *    email: '',
 *    password: '',
 *   },
 *   validate: {
 *      email: (form: FormValues) => {
 *         if (!form.email) return 'Email is required';
 *      },
 *      password: (form: FormValues) => {
 *         if (!form.password) return 'Password is required';
 *      },
 *   },
 * });
 */

const useRadForm = <T extends object>({
  initialValues,
  validate,
}: RadFormProps<T>): RadFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateForm = useCallback(
    (formValues: T) => {
      let newErrors: Partial<Record<keyof T, string>> = {};
      for (const key in validate) {
        const error = validate[key]?.(formValues);
        if (error) newErrors[key as keyof T] = error;
      }
      return newErrors;
    },
    [validate]
  );

  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => {
        const newFormValues = { ...prev, [field]: value };
        setErrors(validateForm(newFormValues));
        return newFormValues;
      });
    },
    [validateForm]
  );

  const handleSubmit = useCallback(
    async (callback: (formValues: T) => Promise<void>) => {
      const newErrors = validateForm(values);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsLoading(true);
        try {
          await callback(values);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [values, validateForm]
  );

  const triggeredRef = useRef(false);
  useEffect(() => {
    if (!triggeredRef.current) {
      triggeredRef.current = true;
      setErrors(validateForm(values));
    }
  }, [values, validateForm]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { handleChange, handleSubmit, resetForm, values, isLoading, errors };
};

export default useRadForm;
