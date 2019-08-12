import { combineReducers } from 'redux';
import userReducer from './userReducer';
import feedReducer from './feedReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  global: globalReducer,
});

export default rootReducer;
