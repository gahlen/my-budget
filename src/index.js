import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
