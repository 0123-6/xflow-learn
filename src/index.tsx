import React from 'react';
import ReactDOM from 'react-dom';
import './style/output.css';

import 'antd/dist/antd.css';
import App from './App';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    root
);
