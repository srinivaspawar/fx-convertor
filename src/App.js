import React from 'react';
import FxCalculator from './Components/FxCalCulator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import fxReducer from './Container/FxCalReducer';

const store = createStore(fxReducer);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <FxCalculator />     
      </div>
    </Provider>

  );
}

export default App;
