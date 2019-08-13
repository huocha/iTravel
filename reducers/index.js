import { combineReducers } from 'redux';
import userReducer from './userReducer';
import feedReducer from './feedReducer';
import globalReducer from './globalReducer';
import chatReducer from './chatReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  global: globalReducer,
  chat: chatReducer,
  search: searchReducer,
});

export default rootReducer;
