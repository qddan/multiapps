import React from 'react';
import DetailScreen from './DetailScreen';

import HomeScreen from './HomeScreen';
// const { CalendarModule } = ReactNative.NativeModules;

export default function App({username}) {
  return <HomeScreen username={username} />;
  // return <DetailScreen />;
}
