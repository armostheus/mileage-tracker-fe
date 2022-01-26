import { combineReducers } from 'redux';
import { expenseReducer, firstOdoReading } from './expenseReducer';

const rootReducer = combineReducers({
  expenseReducer,
  firstOdoReading
});

export default rootReducer;