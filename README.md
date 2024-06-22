# react-rad-form

use-rad-form is a rad React hook that simplifies form handling with built-in validation and state management. Perfect for your next awesome project!

### Installation

Get the latest version of use-rad-form from npm:

```bash
npm install react-rad-form
```

### Usage

Here's a gnarly example of how to use use-rad-form to manage a form with ease:

### Example Usage

```tsx
import React from 'react';
import { useRadForm } from 'use-rad-form';

const RadForm = () => {
  type FormValues = {
    name: string;
    email: string;
    password: string;
  };

  const { handleChange, handleSubmit, resetForm, values, isLoading, errors } =
    useRadForm<FormValues>({
      original: {
        name: '',
        email: '',
        password: '',
      },
      errors: {
        name: (item: FormValues) => {
          if (!item.name) return 'Name is required';
        },
        email: (item: FormValues) => {
          if (!item.email) return 'Email is required';
        },
        password: (item: FormValues) => {
          if (!item.password) return 'Password is required';
        },
      },
    });

  const fakeRequest = (values: FormValues): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted', values);
        resolve();
      }, 2000);
    });
  };

  return (
    <form className="bg-white p-4 m-4 rounded-lg">
      <input
        type="text"
        placeholder="Name"
        value={current.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <p>{formErrors.name}</p>
      <input
        type="email"
        placeholder="Email"
        value={current.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <p>{formErrors.email}</p>
      <input
        type="password"
        placeholder="Password"
        value={current.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <p>{formErrors.password}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          submit(async (values) => {
            await fakeRequest(values);
            resetForm();
          });
        }}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {loading && <p>Loading...</p>}

      <pre>{JSON.stringify(values, null, 2)}</pre>
    </form>
  );
};

export default RadForm;
```

### Hook API

useRadForm takes care of your form state and validation in a rad way.

`useRafForm`

```tsx
const { handleChange, handleSubmit, resetForm, values, isLoading, errors } =
  useRadForm<FormValues>({
    initialValues: {
      // Initial form values
    },
    validate: {
      // Validation rules
    },
  });
```

### Parameters

- `original`: Initial form values
- `errors`: Validation rules

### Return Values

- `handleChange`: Update form values
- `handleSubmit`: Submit form values
- `resetForm`: Reset form values
- `values`: Current form values
- `isLoading`: Loading state
- `errors`: Form validation errors

### Example Validation

Define validation rules for your form fields inside the errors object:

```tsx
const { onChange, submit, reset, current, loading, formErrors } =
  useRadForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      name: (item: FormValues) => {
        if (!item.name) return 'Name is required';
      },
      email: (item: FormValues) => {
        if (!item.email) return 'Email is required';
      },
      password: (item: FormValues) => {
        if (!item.password) return 'Password is required';
      },
    },
  });
```

### Rad Features

- Easy State Management: Manage your form state without the hassle
- Very lightweight: Installed it's just 100kb in `node_modules`
- Built-in Validation: Define validation rules for your form fields
- Loading State: Know when your form is submitting
- Reset Form: Reset your form to its initial state

### Contributing

[Contributions](https://github.com/TS22082/react-rad-form) are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.
