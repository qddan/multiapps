import React from 'react';

import HomeScreen from './HomeScreen';
import ContainerScreen from './ContainerScreen';
// const { CalendarModule } = ReactNative.NativeModules;

export default function App({username}) {
  return <ContainerScreen username={username} />;
}
