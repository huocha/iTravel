import { combineReducers } from 'redux';
import userReducer from './userReducer';
import feedReducer from './feedReducer';
import globalReducer from './globalReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  global: globalReducer,
  search: searchReducer,
});

export default rootReducer;
