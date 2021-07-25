import React, { } from 'react';
import Navigator from './src/navigation/Navigator';
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { StatusBar } from 'react-native';
import { Root } from 'native-base';
console.disableYellowBox = true;

const App = () => {

  return (
    <Root>
      <Provider store={store}>
        <Navigator />
        <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      </Provider>
    </Root>
  );

}
export default (App)