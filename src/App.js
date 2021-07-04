import { createStore } from 'redux';
import {ReduxProvider} from './product/productRedux';
import { ReduxProvider2 } from './product/productRedux';
import Container from './product/productRedux';

import {setter2} from './product/productRedux';
import {store} from './product/productRedux';

function App(props) {

  return (
    <ReduxProvider2>
      <Container/>
    </ReduxProvider2>
  );
}

export default App;
