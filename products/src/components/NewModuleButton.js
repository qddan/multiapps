import React from 'react';
import {NativeModules, Button} from 'react-native';
// const {CalendarModule} = NativeModules;

const NewModuleButton = () => {
  const onPress = () => {
    // CalendarModule.createCalendarEvent('testName', 'testLocation');
  };

  return <Button title="native module!" color="#841584" onPress={onPress} />;
};

export default NewModuleButton;
