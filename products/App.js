import React from 'react';

import HomeScreen from './src/HomeScreen';
// const { CalendarModule } = ReactNative.NativeModules;

export default function App({username}) {
  return <HomeScreen username={username} />;
}
