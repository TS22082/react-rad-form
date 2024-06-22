import { useRadForm } from '../..';

const RadForm = () => {
  type FormValues = {
    name: string;
    email: string;
    password: string;
  };

  const { onChange, submit, reset, current, loading, formErrors } = useRadForm({
    original: {
      name: '',
      email: '',
      password: '',
    },
    errors: {
      name: (form: FormValues) => {
        if (!form.name) return 'Name is required';
      },
      email: (form: FormValues) => {
        if (!form.email) return 'Email is required';
      },
      password: (form: FormValues) => {
        if (!form.password) return 'Password is required';
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
        onChange={(e) => onChange('name', e.target.value)}
      />
      <p>{formErrors.name}</p>
      <input
        type="email"
        placeholder="Email"
        value={current.email}
        onChange={(e) => onChange('email', e.target.value)}
      />
      <p>{formErrors.email}</p>
      <input
        type="password"
        placeholder="Password"
        value={current.password}
        onChange={(e) => onChange('password', e.target.value)}
      />
      <p>{formErrors.password}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          submit(async (values) => {
            await fakeRequest(values);
            reset();
          });
        }}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {loading && <p>Loading...</p>}

      <pre>{JSON.stringify(current, null, 2)}</pre>
      <pre>{JSON.stringify(formErrors, null, 2)}</pre>
    </form>
  );
};

export default RadForm;
