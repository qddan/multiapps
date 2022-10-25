import { NativeModules } from 'react-native';
const { CalendarModule } = NativeModules;
interface CalendarInterface {
   createCalendarEvent(name: string, location: string, startDate: string): void;
   getConstants(): void;
}
export default CalendarModule as CalendarInterface;