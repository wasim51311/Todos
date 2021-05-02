//we need to import React 
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//we need to import Provider and store
import { Provider } from 'react-redux';
import store from './store';

//create MyApp function and wrap <App/> in Provider tag which is necessacry for redux
const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

//make AppRegistry register the MyApp not App
AppRegistry.registerComponent(appName, () => MyApp);