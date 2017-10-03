import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import './fontAwesome/css/font-awesome.min.css'
import './bootstrap/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
