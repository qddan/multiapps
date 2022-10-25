import React from 'react';
import {Button} from 'react-native';
import CalendarModule from './CalendarModule';

const NewModuleButton = () => {
  // const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
  // console.log(DEFAULT_EVENT_NAME);

  const onPress = () => {
    CalendarModule.createCalendarEvent('bar', 'foo', '2022-10-05');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
