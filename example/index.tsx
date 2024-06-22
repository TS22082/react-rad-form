import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import RadForm from './RadForm';

const App = () => {
  return (
    <div>
      <RadForm />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
