import { combineReducers } from 'redux';
import userReducer from './userReducer';
import feedReducer from './feedReducer';
import globalReducer from './globalReducer';
import searchReducer from './searchReducer';
import conversationReducer from './conversationReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  post: postReducer,
  global: globalReducer,
  search: searchReducer,
  conversation: conversationReducer
});

export default rootReducer;
