import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import SimpleExample from './SimpleExample.js';
import { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

import reducer from './reducer';

// Осталось с задания по webpack 
const reducers = combineReducers({
	value: reducer
});
const store = createStore(reducers);

const rootEl = document.getElementById('root');

const _render = (Component) =>
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  );
  
_render(SimpleExample);

if (module.hot) {
	console.log(' включили HMR ');
	module.hot.accept('./SimpleExample.js', () => _render(SimpleExample));	
} 
