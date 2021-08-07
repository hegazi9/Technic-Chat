import React from 'react';
import Rootnavigator from './src/navigation/rootnavigator';
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { StatusBar } from 'react-native';
import { Root } from 'native-base';
console.disableYellowBox = true;

const App = () => {

  return (
    <Root>
      <Provider store={store}>
        <Rootnavigator />
        <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      </Provider>
    </Root>
  );

}
export default (App)