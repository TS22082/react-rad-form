import { useState, useCallback, useEffect, useRef } from 'react';

type Errors<T> = {
  [K in keyof T]?: (value: T) => string | undefined;
};

interface UseRadFormProps<T> {
  original: T;
  errors: Errors<T>;
}

interface UseRadFormReturn<T> {
  onChange: (field: keyof T, value: any) => void;
  submit: (callback: (values: T) => Promise<void>) => Promise<void>;
  reset: () => void;
  current: T;
  loading: boolean;
  formErrors: Partial<Record<keyof T, string>>;
}

const useRadForm = <T extends object>({
  original,
  errors,
}: UseRadFormProps<T>): UseRadFormReturn<T> => {
  const [current, setCurrent] = useState<T>(original);
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});

  const validate = useCallback(
    (item: T) => {
      let newErrors: Partial<Record<keyof T, string>> = {};
      for (const key in errors) {
        const error = errors[key]?.(item);
        if (error) newErrors[key as keyof T] = error;
      }
      return newErrors;
    },
    [errors]
  );

  const onChange = useCallback(
    (field: keyof T, value: any) => {
      setCurrent((prev) => {
        const newItem = { ...prev, [field]: value };
        setFormErrors(validate(newItem));
        return newItem;
      });
    },
    [validate]
  );

  const submit = useCallback(
    async (callback: (values: T) => Promise<void>) => {
      const newErrors = validate(current);
      setFormErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setLoading(true);
        try {
          await callback(current);
        } finally {
          setLoading(false);
        }
      }
    },
    [current, validate]
  );

  const triggeredRef = useRef(false);
  useEffect(() => {
    if (!triggeredRef.current) {
      triggeredRef.current = true;
      setFormErrors(validate(current));
    }
  }, [current, validate]);

  const reset = useCallback(() => {
    setCurrent(original);
    setFormErrors({});
  }, [original]);

  return { onChange, submit, reset, current, loading, formErrors };
};

export default useRadForm;
