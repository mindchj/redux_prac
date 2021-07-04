import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import Container, {store} from './product/productRedux';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    {/* <ReduxProvider store={store} /> */}
    <Provider store={store}>
      <Container/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
