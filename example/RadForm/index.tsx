import { useRadForm } from '../../src/index';

const RadForm = () => {
  type FormValues = {
    name: string;
    email: string;
    password: string;
  };

  const { handleChange, handleSubmit, resetForm, values, isLoading, errors } =
    useRadForm({
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      validate: {
        name: (form: FormValues) => {
          if (!form.name) return 'Name is required';
        },
        email: (form: FormValues) => {
          if (!form.email) return 'Email is required';
        },
        password: (form: FormValues) => {
          if (!form.password) return 'Password is required';
        },
        any: (form: FormValues) => {
          if (!form.email && !form.password)
            return 'Email and password are required';
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
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <p>{errors.name}</p>
      <input
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <p>{errors.email}</p>
      <input
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <p>{errors.password}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(async (values) => {
            await fakeRequest(values);
            resetForm();
          });
        }}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {isLoading && <p>Loading...</p>}

      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </form>
  );
};

export default RadForm;
