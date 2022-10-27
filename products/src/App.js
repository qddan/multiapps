import React from 'react';

import HomeScreen from './HomeScreen';
// const { CalendarModule } = ReactNative.NativeModules;

export default function App({username}) {
  return <HomeScreen username={username} />;
}
